import knex, { type Knex } from "knex";
import path from "path";
import { fileURLToPath } from "url";

import { env } from "./env/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const config: Knex.Config = {
  client: "sqlite",
  connection: {
    //filename: path.resolve(__dirname, "..", "db", "app.db"),
    filename: env.DATABASE_URL,
  },
  useNullAsDefault: true,
  pool: {
    afterCreate: (conn: any, cb: any) => {
      conn.run("PRAGMA foreign_keys = ON", cb);
    },
  },
  migrations: {
    directory: path.resolve(__dirname, "..", "db", "migrations"),
    extension: "ts",
  },
};

export const db = knex(config);
