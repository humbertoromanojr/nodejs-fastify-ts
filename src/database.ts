import knex from "knex";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const config = {
  client: "sqlite",
  connection: {
    filename: path.resolve(__dirname, "..", "tmp", "app.db"),
  },
  useNullAsDefault: true,
  pool: {
    afterCreate: (conn: any, cb: any) => {
      conn.run("PRAGMA foreign_keys = ON", cb);
    },
  },
  migrations: {
    directory: path.resolve(__dirname, "..", "migrations"),
    extension: "ts",
  },
};

export const db = knex(config);
