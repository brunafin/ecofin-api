import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";
import StartUp from "../../app";
import request from "supertest";
import { faker } from "@faker-js/faker/locale/pt_BR";

let server;

beforeAll(async () => {
  const port = 3000;
  server = StartUp.app.listen(port);
});

afterAll(async () => {
  await server.close();
});

describe("GET /outlays", () => {
  it("should return outlays list", async () => {
    const response = await request(StartUp.app).get("/api/v1/outlays");
    expect(response.status).toBe(200);
  });
});

describe("POST /outlays", () => {
  it("should create outlay", async () => {
    const response = await request(StartUp.app)
      .post("/api/v1/outlays")
      .send({
        description: faker.commerce.product(),
        price: faker.commerce.price(),
        month_year: `${new Date().getMonth() + 2}/${new Date().getFullYear()}`,
      });
    expect(response.status).toBe(201);
  });
});
