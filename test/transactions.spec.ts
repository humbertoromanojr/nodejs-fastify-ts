import { expect, test } from "vitest";
import supertest from "supertest";
import { app } from "../src/app.js";

test("POST /transactions", async () => {
  const response = await supertest(app.server)
    .post("/transactions")
    .send({
      title: "New transaction",
      amount: 2300,
      type: "credit",
    })
    .set("Accept", "application/json")
    .expect(201);
  expect(response.body).toHaveProperty("transactions");
});
