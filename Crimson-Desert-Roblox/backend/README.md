# Crimson Desert — Claude backend

A tiny Cloudflare Worker that lets your Roblox game use Claude safely.
Roblox → **this Worker (holds the key)** → Anthropic API.

## Why a proxy?
- Roblox `HttpService` only works from **server scripts**, and your Anthropic
  API key must **never** ship inside a Roblox place.
- The Worker holds the key, adds a shared-secret gate, and can rate-limit.

## Deploy (about 5 minutes)
```bash
cd Crimson-Desert-Roblox/backend
npm install -g wrangler        # Cloudflare CLI (or: npx wrangler ...)
wrangler login

# store your secrets (these are NOT in wrangler.toml)
wrangler secret put ANTHROPIC_API_KEY     # paste your Anthropic key
wrangler secret put GAME_SHARED_SECRET    # any long random string

wrangler deploy                # prints your https://...workers.dev URL
```

## Then in Roblox
1. Studio → **Game Settings → Security → Allow HTTP Requests** = on.
2. Open `src/ClaudeService.lua`, set `PROXY_URL` to your Worker URL and
   `GAME_SECRET` to the same `GAME_SHARED_SECRET` you set above.
3. Drop `ClaudeService.lua` and `NpcDialogueServer.lua` into
   **ServerScriptService**. Talk to `ReplicatedStorage.NpcChat` from a client.

## Test the endpoint directly
```bash
curl -X POST https://YOUR-WORKER.workers.dev \
  -H "content-type: application/json" \
  -H "x-game-secret: YOUR_SHARED_SECRET" \
  -d '{"mode":"npc","message":"Who took the caravans?",
       "context":{"npc":"Elder Ysolde, Keeper of Restwater"}}'
```

## Modes
| `mode`        | What it does |
|---------------|--------------|
| `npc`         | In-character NPC dialogue (`context.npc` = who they are) |
| `gamemaster`  | Dynamic quests / events / narration from a situation |
| `lore`        | Bestiary / codex question answering |

## Model choice (important)
`MODEL` in `wrangler.toml` defaults to `claude-opus-5` (best narration).
**For real-time NPC chat, change it to `claude-haiku-4-5`** — much faster
and cheaper, which is what a game needs. It's a one-line change, no redeploy
of code logic required (`wrangler deploy` after editing the toml).

## Cost & safety notes
- You are billed per Anthropic API call — the shared secret + per-player
  cooldown in `ClaudeService.lua` keep costs bounded. Add more limits before
  a public launch.
- The Worker never returns your key. The client never sees the Worker URL.
- Player messages are clamped in length server-side; add moderation
  (Roblox `TextService:FilterStringAsync`) on anything you display.
