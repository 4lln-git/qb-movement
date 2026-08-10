/**
 * Crimson Desert — Claude proxy (Cloudflare Worker)
 * ------------------------------------------------------------------
 * Roblox cannot call the Anthropic API directly (no SDK, and the API
 * key must never ship inside a Roblox place). This Worker sits between
 * them: Roblox POSTs here, this Worker adds the secret key and calls
 * Claude, then returns just the text.
 *
 * ONE endpoint, many uses. The request body carries a `mode` that
 * selects an in-character system prompt:
 *   - "npc"         talking NPCs (in-character dialogue)
 *   - "gamemaster"  dynamic quests / events / narration
 *   - "lore"        bestiary / codex question answering
 *
 * Secrets (set with `wrangler secret put`, NEVER hard-code):
 *   ANTHROPIC_API_KEY   your Anthropic key
 *   GAME_SHARED_SECRET  a random string; Roblox must send it back in
 *                       the `x-game-secret` header (blocks randoms who
 *                       find the URL from spending your tokens)
 *
 * Vars (set in wrangler.toml [vars], safe to be public):
 *   MODEL   Claude model id. Defaults to claude-opus-5.
 *           ⚠️ For real-time NPC chat, set this to "claude-haiku-4-5"
 *           — it is far faster and cheaper, which is what a game needs.
 *           Change it in wrangler.toml; no code edit required.
 */

const WORLD = `You are a character engine for CRIMSON DESERT, a dark-fantasy \
action RPG set on a bleeding frontier called the Marches — a lawless \
borderland of iron, sand, and old sorcery. Factions: the Ashen Company \
(sellswords), Restwater and Ironhold (frontier camps). Threats include \
the Grieving Behemoth, a colossus of the Scorched Reach. Tone: gritty, \
weathered, sparing with words. Never break character, never mention that \
you are an AI, and never reference the real world.`;

const PROMPTS = {
  npc: (ctx) => `${WORLD}
You ARE the NPC described below. Speak only as them, in first person, in \
1–3 short sentences. Stay in their voice and knowledge — a camp elder does \
not know things happening across the map.
NPC: ${ctx.npc || "a weathered frontier sellsword"}.`,

  gamemaster: () => `${WORLD}
You are the GAME MASTER. Given the player's situation, invent a short, \
flavorful quest, event, or piece of narration. Be concrete: name a place, \
a stake, and a reward. Keep it under 60 words. Return prose only — no lists.`,

  lore: () => `${WORLD}
You are the BESTIARY CODEX. Answer the player's question about the world, \
its creatures, factions, or history in 2–4 sentences. Invent consistent \
detail where the world is silent, but never contradict the facts above.`,
};

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "content-type, x-game-secret",
  };
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", ...corsHeaders() },
  });
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders() });
    }
    if (request.method !== "POST") {
      return json({ error: "Use POST." }, 405);
    }

    // Shared-secret gate so only your game can spend your tokens.
    if (env.GAME_SHARED_SECRET) {
      if (request.headers.get("x-game-secret") !== env.GAME_SHARED_SECRET) {
        return json({ error: "Unauthorized." }, 401);
      }
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return json({ error: "Body must be JSON." }, 400);
    }

    const mode = payload.mode || "npc";
    const buildPrompt = PROMPTS[mode];
    if (!buildPrompt) {
      return json({ error: `Unknown mode "${mode}".` }, 400);
    }

    const userText = String(payload.message || "").slice(0, 2000);
    if (!userText) {
      return json({ error: "Missing `message`." }, 400);
    }

    const system = buildPrompt(payload.context || {});
    const model = env.MODEL || "claude-opus-5";

    const body = {
      model,
      max_tokens: 320,
      system,
      messages: [{ role: "user", content: userText }],
      // Keep replies fast for real-time play. Thinking off + low effort
      // suits short in-character lines. (On claude-opus-5, disabling
      // thinking is allowed at effort "high" or lower.)
      thinking: { type: "disabled" },
      output_config: { effort: "low" },
    };

    let res;
    try {
      res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify(body),
      });
    } catch (err) {
      return json({ error: "Upstream request failed.", detail: String(err) }, 502);
    }

    const data = await res.json();
    if (!res.ok) {
      return json({ error: "Claude API error.", detail: data }, res.status);
    }

    // Safety classifiers can decline (HTTP 200, stop_reason "refusal").
    if (data.stop_reason === "refusal") {
      return json({ text: "…the words catch in their throat. (declined)", refusal: true });
    }

    const text = (data.content || [])
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("")
      .trim();

    return json({ text, model: data.model });
  },
};
