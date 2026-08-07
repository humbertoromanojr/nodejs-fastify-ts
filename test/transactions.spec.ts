import { expect, test, beforeAll, afterAll, describe, it } from "vitest";
import supertest from "supertest";
import { app } from "../src/app.js";

describe("Transactions routes", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a new transaction", async () => {
    await supertest(app.server)
      .post("/transactions")
      .set("Cookie", "sessionId=test-session-id")
      .send({
        title: "New transaction",
        amount: 2300,
        type: "credit",
      })
      .expect(201)
  })

  it("should be able to list All transaction", async () => {
    const createTransactionResponse = await supertest(app.server)
      .post("/transactions")
      .set("Cookie", "sessionId=test-session-id")
      .send({
        title: "New transaction",
        amount: 1300,
        type: "credit",
      })

      const cookies = createTransactionResponse.get("Set-Cookie")

      const listTransactionsResponse = await supertest(app.server)
        .get("/transactions")
        .set("Cookie", "sessionId=test-session-id")
        .expect(200)

      expect(listTransactionsResponse.body.transactions).toEqual([
        expect.objectContaining({
          title: "New transaction",
          amount: 1300,
        }),
      ]);
    });
  
});
