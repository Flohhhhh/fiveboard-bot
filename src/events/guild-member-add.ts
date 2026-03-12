import { Events } from 'discord.js';
import { env } from '@/env';
import type { Event } from '@/types';
import { logger } from '@/utils/logger';

const log = logger.child({ name: 'events/guild-member-add' });

export const event: Event<Events.GuildMemberAdd> = {
  name: Events.GuildMemberAdd,
  execute: async (member) => {
    if (!env.FIVEBOARD_ENABLE_BETA_ROLE) return;
    if (member.guild.id !== env.FIVEBOARD_GUILD_ID) return;

    const roleId = env.FIVEBOARD_BETA_TESTER_ROLE_ID;
    if (!roleId) return;

    try {
      const role = await member.guild.roles.fetch(roleId);
      if (!role) {
        log.warn(
          { guildId: member.guild.id, roleId },
          'Configured beta tester role was not found'
        );
        return;
      }

      await member.roles.add(
        role.id,
        'Auto-assign beta tester role on member join'
      );
    } catch (error) {
      log.error(
        {
          err: error,
          memberId: member.id,
          guildId: member.guild.id,
          roleId
        },
        'Failed to assign beta tester role on member join'
      );
    }
  }
};
