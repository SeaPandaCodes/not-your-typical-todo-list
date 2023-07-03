import { pool } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { rows } = await pool.query("SELECT * FROM test_table");

  res.status(200).json({ name: "John Doe" });
}
