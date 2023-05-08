import { describe, it, expect } from "@jest/globals";
import OutlaySchema from "../../src/models/outlaySchema";
import mongoose from "mongoose";
import { faker } from "@faker-js/faker/locale/pt_BR";

describe("Outlays models", () => {
  const obj = {
    description: faker.commerce.product(),
    price: Number(faker.commerce.price()),
    month_year: `${new Date().getMonth() + 2}/${new Date().getFullYear()}`,
  };

  it("Should create new outlay instance", () => {
    const OutlayModel = mongoose.model("Outlay", OutlaySchema);
    const outlay = new OutlayModel(obj);
    expect(outlay).toEqual(expect.objectContaining(obj));
  });

  // aqui poderia testar métodos da model, operações do banco de dados CRUD
});
