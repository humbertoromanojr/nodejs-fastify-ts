import type { FastifyInstance } from "fastify";
import { randomUUID } from "node:crypto";
import { z } from "zod";

import { db as knex } from "../database.js";

export async function transactionsRoutes(app: FastifyInstance) {
  app.get("/", async () => {
    // list all transactions
    const transactions = await knex("transactions").select();

    return { transactions };
  });

  app.get("/:id", async (request) => {
    // get a transaction by id
    const getTransactionParamsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = getTransactionParamsSchema.parse(request.params);

    const transaction = await knex("transactions").where("id", id).first();

    return { transaction };
  });

  app.get("/summary", async () => {
    // get a summary of all transactions
    const summary = await knex("transactions")
      .sum("amount", { as: "amount" })
      .first();
    return { summary };
  });

  app.post("/", async (request, replay) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(["credit", "debit"]),
    });

    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    );

    let sessionId = request.cookies.sessionId;
    if (!sessionId) {
      sessionId = randomUUID();

      replay.setCookie("sessionId", sessionId, {
        path: "/",
        maxAge: 60 * 60 * 24 * 2, // 2 days
      });
    }

    await knex("transactions").insert({
      id: randomUUID(),
      title,
      amount: type === "credit" ? amount : -amount,
      session_id: sessionId,
    });

    return replay.status(201).send();
  });
}
