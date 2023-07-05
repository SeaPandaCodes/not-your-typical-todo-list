import "dotenv/config";
import { Pool } from "pg";

export const pool = new Pool({
  max: 20, // maximum number of connections in the pool
});
