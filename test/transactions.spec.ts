import { expect, test, beforeAll, afterAll, describe, it, beforeEach } from "vitest";
import supertest from "supertest";
import { execSync } from "node:child_process";

import { app } from "../src/app.js";

describe("Transactions routes", () => {
  beforeAll(async () => {
    await app.ready();
  });

  /*
  Reset the database to set up the test environment
  */
 beforeEach(async () => {
  // clear database
  execSync("npm run knex migrate:rollback --all");

  // create again the database
  execSync("npm run knex migrate:latest");
 })



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

    it("should be able to get a SPECIFIC transaction", async () => {
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

      const transactionId = listTransactionsResponse.body.transactions[0].id

      const getTransactionsResponse = await supertest(app.server)
        .get(`/transactions/${transactionId}`)
        .set("Cookie", "sessionId=test-session-id")
        .expect(200)

      expect(getTransactionsResponse.body.transaction).toEqual([
        expect.objectContaining({
          title: "New transaction",
          amount: 1300,
        }),
      ]);
    });
  
});
