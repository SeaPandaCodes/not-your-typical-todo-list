import { z } from "zod";
import { procedure, router } from "../trpc";
import { pool } from "@/utils/db";
import crypto from "crypto";

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string().min(10),
      })
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
  tasks: procedure.query(async ({ ctx }) => {
    const userId = ctx.userId;

    const { rows } = await pool.query<{
      points: number;
      tasks: Array<{
        id: string;
        name: string;
      }>;
    }>(
      `SELECT
          points,
          jsonb_agg(jsonb_build_object('id', id, 'name', name)) as tasks
        FROM tasks
        WHERE user_id = $1 AND completed_at IS NULL
        GROUP BY points`,
      [userId]
    );

    return {
      tasks: rows,
    };
  }),
  availableRewards: procedure.query(async ({ ctx }) => {
    const userId = ctx.userId;

    const { rows } = await pool.query<{
      points: number;
      rewards: Array<{
        id: string;
        name: string;
      }>;
    }>(
      `
    WITH reward_redemptions as (SELECT COUNT(*) as redemptions, reward_id FROM redemptions
        WHERE user_id = $1
        GROUP BY reward_id), available_rewards as (
            SELECT * FROM rewards LEFT JOIN reward_redemptions r on rewards.id = r.reward_id
            WHERE user_id = $1 AND max_redemptions IS NULL OR max_redemptions < redemptions
        ), available_reward_objs as (
            SELECT points, jsonb_build_object('id', id, 'name', name) as reward_obj FROM available_rewards
    ) SELECT points, jsonb_agg(reward_obj) as rewards FROM available_reward_objs GROUP BY points ORDER BY points
    `,
      [userId]
    );

    return rows;
  }),
  currentPoints: procedure.query(async ({ ctx }) => {
    const userId = ctx.userId;

    const { rows } = await pool.query<{
      point_balance: number;
    }>(
      `
      WITH task_points as
      (SELECT SUM(points) as points
           FROM tasks
           WHERE user_id = $1
           AND completed_at IS NOT NULL),
       reward_points as
       (SELECT SUM(points) as points
         FROM redemptions
         LEFT JOIN rewards r on redemptions.reward_id = r.id)
        SELECT COALESCE(task_points.points - reward_points.points, 0) as point_balance FROM task_points, reward_points;
    `,
      [userId]
    );

    return rows;
  }),
  addTask: procedure
    .input(
      z.object({
        name: z.string(),
        points: z.number(),
      })
    )

    .mutation(async ({ ctx, input }) => {
      const user_id = ctx.userId;
      const id = crypto.randomBytes(16).toString("hex");

      await pool.query(
        `
      INSERT INTO tasks (id, user_id, name, completed_at, points)  VALUES  ($1,$2,$3,$4,$5)
      `,
        [id, user_id, input.name, null, input.points]
      );

      return;
    }),
  addReward: procedure
    .input(
      z.object({
        name: z.string(),
        maxRedemptions: z.number(),
        points: z.number(),
      })
    )

    .mutation(async ({ ctx, input }) => {
      const user_id = ctx.userId;
      const id = crypto.randomBytes(16).toString("hex");

      await pool.query(
        `
      INSERT INTO rewards (id, user_id, name, max_redemptions, points, deleted)  VALUES  ($1,$2,$3,$4,$5,$6)
    `,
        [id, user_id, input.name, input.maxRedemptions, input.points, false]
      );

      return;
    }),
  redeemReward: procedure
    .input(
      z.object({
        rewardId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user_id = ctx.userId;
      const id = crypto.randomBytes(16).toString("hex");

      await pool.query(
        `
      INSERT INTO redemptions (id, user_id, reward_id, redeemed_at) VALUES ($1,$2,$3,$4)
      `,
        [id, user_id, input.rewardId, new Date()]
      );

      return;
    }),
  completeTask: procedure
    .input(
      z.object({
        taskId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user_id = ctx.userId;

      await pool.query(
        `
    UPDATE tasks SET completed_at = $1 WHERE id = $2 AND user_id = $3
    `,
        [new Date(), input.taskId, user_id]
      );

      return;
    }),
  deleteReward: procedure
    .input(
      z.object({
        rewardId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user_id = ctx.userId;

      await pool.query(
        `
    UPDATE rewards SET deleted = true WHERE id = $1 AND user_id = $2
    `,
        [input.rewardId, user_id]
      );

      return;
    }),
  deleteTask: procedure
    .input(
      z.object({
        taskId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user_id = ctx.userId;

      await pool.query(
        `
      DELETE FROM tasks WHERE id = $1 AND user_id = $2
  `,
        [input.taskId, user_id]
      );

      return;
    }),
});

export type AppRouter = typeof appRouter;
