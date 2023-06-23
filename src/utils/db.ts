import { Pool } from "pg";
import { config } from "dotenv";

config({ path: ".env" });

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: parseInt(process.env.PORT!),
  max: 20, // maximum number of connections in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 2000, // how long to wait for a connection to be established
});

pool.query("SELECT * FROM testing", (err, res) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(res.rows[0]);
});
