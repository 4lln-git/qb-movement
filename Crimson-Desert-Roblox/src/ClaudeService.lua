--!strict
-- ClaudeService  (ServerScriptService — a ModuleScript)
-- ------------------------------------------------------------------
-- Talks to your Cloudflare Worker proxy, which talks to Claude.
-- SERVER-SIDE ONLY. HttpService requests never run on the client, and
-- the shared secret must never reach a client.
--
-- Setup:
--   1. Roblox Studio → Game Settings → Security → enable
--      "Allow HTTP Requests".
--   2. Set PROXY_URL below to your deployed Worker URL.
--   3. Store the shared secret out of source if you can (see note),
--      or paste it into GAME_SECRET for a quick start.

local HttpService = game:GetService("HttpService")

local ClaudeService = {}

-- CONFIG ------------------------------------------------------------
local PROXY_URL  = "https://crimson-desert-claude.YOUR-SUBDOMAIN.workers.dev"
local GAME_SECRET = "paste-the-same-GAME_SHARED_SECRET-you-set-in-wrangler"

-- Simple per-player cooldown so one player can't spam your token budget.
local COOLDOWN_SECONDS = 2
local lastCall: { [number]: number } = {}

-- ask(mode, message, context) -> ok: boolean, text: string
-- mode: "npc" | "gamemaster" | "lore"
function ClaudeService.ask(mode: string, message: string, context: {}?): (boolean, string)
	local body = HttpService:JSONEncode({
		mode = mode,
		message = message,
		context = context or {},
	})

	local ok, response = pcall(function()
		return HttpService:RequestAsync({
			Url = PROXY_URL,
			Method = "POST",
			Headers = {
				["Content-Type"] = "application/json",
				["x-game-secret"] = GAME_SECRET,
			},
			Body = body,
		})
	end)

	if not ok then
		warn("[ClaudeService] request failed:", response)
		return false, "The frontier is silent. (network error)"
	end

	if not response.Success then
		warn("[ClaudeService] HTTP", response.StatusCode, response.Body)
		return false, "The frontier is silent. (" .. tostring(response.StatusCode) .. ")"
	end

	local data = HttpService:JSONDecode(response.Body)
	return true, data.text or "…"
end

-- askFor(player, ...) adds per-player rate limiting on top of ask().
function ClaudeService.askFor(player: Player, mode: string, message: string, context: {}?): (boolean, string)
	local now = os.clock()
	local last = lastCall[player.UserId]
	if last and (now - last) < COOLDOWN_SECONDS then
		return false, "Give them a moment to answer."
	end
	lastCall[player.UserId] = now
	return ClaudeService.ask(mode, message, context)
end

return ClaudeService
