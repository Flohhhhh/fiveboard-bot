import { Client, GatewayIntentBits } from 'discord.js';

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
    /* You can uncomment below as needed */
    // GatewayIntentBits.GuildMessages,
    // GatewayIntentBits.MessageContent,s
  ]
});
