import type { FastifyInstance } from "fastify";

import { db as knex } from "../database.js";

export async function transactionsRoutes(app: FastifyInstance) {
  app.get("/hello", async () => {
    const transactions = await knex("transactions")
      .insert({
        id: crypto.randomUUID(),
        title: "Transaction test",
        amount: 2000,
      })
      .returning("*");

    return transactions;
  });
}
