import {
  type ChatInputCommandInteraction,
  MessageFlags,
  SlashCommandBuilder
} from 'discord.js';
import type { Command } from '@/types';

export const command: Command<ChatInputCommandInteraction> = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription("Shows the bot's uptime and latency."),
  execute: async (interaction) => {
    const websocketLatency = interaction.client.ws.ping;
    const responseDelay = Date.now() - interaction.createdTimestamp;
    const uptime = formatUptime(interaction.client.uptime ?? 0);

    await interaction.reply({
      content:
        `🏓 Pong!\n` +
        `Uptime: **${uptime}**\n` +
        `Response delay: **${responseDelay}ms**\n` +
        `WebSocket latency: **${websocketLatency}ms**`,
      flags: MessageFlags.Ephemeral
    });
  }
};

const formatUptime = (ms: number): string => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ${hours % 24}h`;
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
  return `${seconds}s`;
};
