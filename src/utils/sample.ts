import { pool } from "./db";
import crypto from "crypto";

export async function createSampleTasks(userId: string) {
  function randomId() {
    return crypto.randomBytes(16).toString("hex");
  }

  // id, user_id, name, completed_at, points
  const tasks: Array<{
    id: string;
    name: string;
    points: 10 | 30 | 60;
  }> = [
    {
      id: randomId(),
      name: "Do Laundry",
      points: 10,
    },
    {
      id: randomId(),
      name: "Water the plants",
      points: 10,
    },
    {
      id: randomId(),
      name: "Mow the lawn",
      points: 30,
    },
    {
      id: randomId(),
      name: "Clean up garage",
      points: 30,
    },
    {
      id: randomId(),
      name: "Full car maintenance: air pressure, oil, etc.",
      points: 60,
    },
    {
      id: randomId(),
      name: "Paint the bedroom walls",
      points: 60,
    },
  ];

  pool.query(
    `
  INSERT INTO tasks (id, user_id, name, completed_at, points)
  SELECT
      datajson->>'id',
      $1,
      datajson->>'name',
      null,
      CAST(datajson->>'points' as int)
  FROM jsonb_array_elements($2::jsonb) AS t(datajson)`,
    [userId, JSON.stringify(tasks)]
  );
}

export async function createSampleRewards(userId: string) {
  function randomId() {
    return crypto.randomBytes(16).toString("hex");
  }

  // id, user_id, name, max_redemption, points,deleted
  const rewards: Array<{
    id: string;
    name: string;
    points: 10 | 30 | 60;
  }> = [
    {
      id: randomId(),
      name: "Go out and get fancy coffee",
      points: 10,
    },
    {
      id: randomId(),
      name: "Watch an episode of a show",
      points: 10,
    },
    {
      id: randomId(),
      name: "Get new flowers for the garden",
      points: 30,
    },
    {
      id: randomId(),
      name: "Take a break and paint",
      points: 30,
    },
    {
      id: randomId(),
      name: "Buy two new paint colors",
      points: 60,
    },
    {
      id: randomId(),
      name: "Go out for dinner",
      points: 60,
    },
  ];

  pool.query(
    `
  INSERT INTO rewards (id, user_id, name, max_redemptions, points, deleted)
  SELECT
      datajson->>'id',
      $1,
      datajson->>'name',
      null,
      CAST(datajson->>'points' as int),
      false
  FROM jsonb_array_elements($2::jsonb) AS t(datajson)`,
    [userId, JSON.stringify(rewards)]
  );
}
