import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
  server: {
    DISCORD_BOT_TOKEN: z.string().min(1, 'DISCORD_BOT_TOKEN is required'),
    DISCORD_APPLICATION_ID: z
      .string()
      .min(1, 'DISCORD_APPLICATION_ID is required'),
    DISCORD_GUILD_ID: z.string().optional(),
    FIVEBOARD_ENABLE_BETA_ROLE: z
      .enum(['true', 'false'], {
        error: 'FIVEBOARD_ENABLE_BETA_ROLE must be either "true" or "false"'
      })
      .transform((value) => value === 'true'),
    FIVEBOARD_GUILD_ID: z.string().min(1, 'FIVEBOARD_GUILD_ID is required'),
    FIVEBOARD_BETA_TESTER_ROLE_ID: z.string().optional(),
    LOG_LEVEL: z
      .enum(['debug', 'info', 'warn', 'error'])
      .optional()
      .default('info')
  },
  createFinalSchema: (shape) =>
    z.object(shape).superRefine((data, ctx) => {
      if (
        data.FIVEBOARD_ENABLE_BETA_ROLE &&
        !data.FIVEBOARD_BETA_TESTER_ROLE_ID
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['FIVEBOARD_BETA_TESTER_ROLE_ID'],
          message:
            'FIVEBOARD_BETA_TESTER_ROLE_ID is required when FIVEBOARD_ENABLE_BETA_ROLE is true'
        });
      }
    })
});
