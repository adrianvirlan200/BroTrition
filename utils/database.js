import { createPool } from "mysql2/promise";

const pool = createPool({
  host: "localhost",
  port: "3002",
  database: "brotrition",
  user: "root",
  password: "root",
});

export default pool;
