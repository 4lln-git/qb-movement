--!strict
-- NpcDialogueServer  (ServerScriptService — a Script)
-- ------------------------------------------------------------------
-- Wires a RemoteFunction so the CLIENT can ask an NPC something and get
-- Claude's in-character reply back. The client never sees the API key,
-- the proxy URL, or the shared secret — only this server does.
--
-- Create a RemoteFunction named "NpcChat" inside ReplicatedStorage
-- (or let this script create it), then call it from a LocalScript:
--
--   local reply = ReplicatedStorage.NpcChat:InvokeServer(
--       "Elder Ysolde, Keeper of Restwater",
--       "Who took the caravans?")

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local ServerScriptService = game:GetService("ServerScriptService")

local ClaudeService = require(ServerScriptService:WaitForChild("ClaudeService"))

local remote = ReplicatedStorage:FindFirstChild("NpcChat")
if not remote then
	remote = Instance.new("RemoteFunction")
	remote.Name = "NpcChat"
	remote.Parent = ReplicatedStorage
end

remote.OnServerInvoke = function(player: Player, npcName: string, message: string): string
	-- Never trust client input: clamp it.
	npcName = tostring(npcName):sub(1, 120)
	message = tostring(message):sub(1, 500)

	local ok, text = ClaudeService.askFor(player, "npc", message, { npc = npcName })
	return text  -- ok=false already returns a friendly in-world fallback string
end

print("[NpcDialogueServer] ready — clients can InvokeServer on ReplicatedStorage.NpcChat")
