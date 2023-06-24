import { z } from "zod";
import { procedure, router } from "../trpc";
import { pool } from "@/utils/db";
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
  tasks: procedure.query(async () => {
    const { rows } = await pool.query<{ testing: string }>(
      "SELECT * FROM test_table"
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
            SELECT * FROM rewards RIGHT JOIN reward_redemptions r on rewards.id = r.reward_id
            WHERE max_redemptions IS NULL OR max_redemptions < redemptions
        ), available_reward_objs as (
            SELECT points, jsonb_build_object('id', id, 'name', name) as reward_obj FROM available_rewards
    ) SELECT points, jsonb_agg(reward_obj) as rewards FROM available_reward_objs GROUP BY points ORDER BY points
    `,
      [userId]
    );

    // console.log(rows, userId);

    return rows;
  }),
});

export type AppRouter = typeof appRouter;

// WITH task_points as
//     (SELECT SUM(points) as points
//          FROM tasks
//          WHERE user_id = '1'
//          AND completed_at IS NOT NULL),
//      reward_points as
//      (SELECT SUM(points) as points
//        FROM redemptions
//        LEFT JOIN rewards r on redemptions.reward_id = r.id
//        WHERE redemptions.user_id = '1')
// SELECT task_points.points - reward_points.points as point_balance FROM task_points, reward_points;

// WITH reward_redemptions as (SELECT COUNT(*) as redemptions, reward_id FROM redemptions
//     WHERE user_id = '1'
//     GROUP BY reward_id), available_rewards as (
//         SELECT * FROM rewards LEFT JOIN reward_redemptions r on rewards.id = r.reward_id
//         WHERE max_redemptions IS NULL OR max_redemptions < redemptions
//     ), available_reward_objs as (
//         SELECT points, jsonb_build_object('id', id, 'name', name) as reward_obj FROM available_rewards
// ) SELECT points, jsonb_agg(reward_obj) FROM available_reward_objs GROUP BY points ORDER BY points
