import app from "../src/app";
import supertest from 'supertest';
import { prisma } from "../src/database.js";
import { faker } from "@faker-js/faker";

import { createPreDefinedDataFactory } from "./factories/createPreDefinedDataFactory.js";
import { generateToken } from "./factories/generateToken";


describe("Test tests - POST /tests/create", () => {

  afterAll(disconnect);  
  
  it("should return 201 and persist the test given a valid body", async () => {
    const token = await generateToken();
    const data = await createPreDefinedDataFactory();

    const body = {
      category: data.category.name,
      discipline: data.discipline.name,
      instructor: data.teacher.name,
      testPdf: "https://www.google.com",
      testTitle: faker.random.words(4)
    };

    const res = await supertest(app).post("/tests/create").send(body).set('Authorization', `Bearer ${token}`);
    const test = await prisma.test.findMany({});

    expect(res.status).toEqual(201);
    expect(test).not.toBeNull();
  });

  it("should return 422 and not persist the test given an empty body", async () => {
    const token = await generateToken();
    const data = await createPreDefinedDataFactory();

    const body = {};

    const res = await supertest(app).post("/tests/create").send(body).set('Authorization', `Bearer ${token}`);
    const test = await prisma.test.findMany({});

    expect(res.status).toEqual(422);
    expect(test).toEqual([]);
  });

  it("should return 404 and not persist the test given a non-existent instructor", async () => {
    const token = await generateToken();
    const data = await createPreDefinedDataFactory();

    const body = {
      category: data.category.name,
      discipline: data.discipline.name,
      instructor: faker.name.firstName(),
      testPdf: "https://www.google.com",
      testTitle: faker.random.words(4)
    };

    const res = await supertest(app).post("/tests/create").send(body).set('Authorization', `Bearer ${token}`);
    const test = await prisma.test.findMany({});

    expect(res.status).toEqual(404);
    expect(test).toEqual([]);
  });

});

async function disconnect() {
  await prisma.$disconnect();
}