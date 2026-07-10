import knex from "knex";

export const db = knex({
  client: "sqlite3",
  connection: {
    filename: "./tmp/app.db",
  },
  useNullAsDefault: true,
  pool: {
    afterCreate: (conn: any, cb: any) => {
      conn.run("PRAGMA foreign_keys = ON", cb);
    },
  },
});
