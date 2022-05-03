import app from "../src/app";
import supertest from 'supertest';
import { prisma } from "../src/database.js";
import { faker } from "@faker-js/faker";

import { generateToken } from "./factories/generateToken";
import { createPreDefinedDataFactory } from "./factories/createPreDefinedDataFactory";

describe("Search by Teacher - GET /tests?groupBy=teachers&filterTeacher=teacherName", () => {

  beforeEach(truncateTests);
  afterAll(disconnect);

  it("should return tests given a valid filter by teacher", async () => {
    const token = await generateToken();
    const data = await createPreDefinedDataFactory();

    const body = {
      category: data.category.name,
      discipline: data.discipline.name,
      instructor: data.teacher.name,
      testPdf: "https://www.google.com",
      testTitle: faker.random.words(4)
    };

    const testResponse = await supertest(app).post("/tests/create").send(body).set('Authorization', `Bearer ${token}`);
    const test = await prisma.test.findMany({});

    const teacherName = data.teacher.name;
    const testFilteredByTeacher = await supertest(app).get(`/tests?groupBy=teachers&filterTeacher=${teacherName}`).set('Authorization', `Bearer ${token}`);

    expect(testResponse.status).toEqual(201);
    expect(test).not.toBeNull();
    expect(testFilteredByTeacher.body.tests[0].teacher.name).toEqual(teacherName);
  });

  it("should return [] given a invalid filter", async () => {
    const token = await generateToken();
    const data = await createPreDefinedDataFactory();

    const body = {
      category: data.category.name,
      discipline: data.discipline.name,
      instructor: data.teacher.name,
      testPdf: "https://www.google.com",
      testTitle: faker.random.words(4)
    };

    const testResponse = await supertest(app).post("/tests/create").send(body).set('Authorization', `Bearer ${token}`);
    const test = await prisma.test.findMany({});

    const teacherName = faker.name.firstName();
    const testFilteredByTeacher = await supertest(app).get(`/tests?groupBy=teachers&filterTeacher=${teacherName}`).set('Authorization', `Bearer ${token}`);

    expect(testResponse.status).toEqual(201);
    expect(test).not.toBeNull();
    expect(testFilteredByTeacher.body.tests).toEqual([]);
  });
  
});


describe("Search by Discipline - GET /tests?groupBy=disciplines&filterDiscipline=disciplineName", () => {

    beforeAll(truncateTests);
    afterAll(disconnect);

    it("should return tests given a valid filter by discipline", async () => {
        const token = await generateToken();
        const data = await createPreDefinedDataFactory();
    
        const body = {
          category: data.category.name,
          discipline: data.discipline.name,
          instructor: data.teacher.name,
          testPdf: "https://www.google.com",
          testTitle: faker.random.words(4)
        };
    
        const testResponse = await supertest(app).post("/tests/create").send(body).set('Authorization', `Bearer ${token}`);
        const test = await prisma.test.findMany({});
    
        const disciplineName = data.discipline.name;
        const testFilteredByDiscipline = await supertest(app).get(`/tests?groupBy=disciplines&filterDiscipline=${disciplineName}`).set('Authorization', `Bearer ${token}`);
    
        expect(testResponse.status).toEqual(201);
        expect(test).not.toBeNull();
        expect(testFilteredByDiscipline.body.tests[0].disciplines[0].name).toEqual(disciplineName);
      });
    
      it("should return [] given a invalid filter", async () => {
        const token = await generateToken();
        const data = await createPreDefinedDataFactory();
    
        const body = {
          category: data.category.name,
          discipline: data.discipline.name,
          instructor: data.teacher.name,
          testPdf: "https://www.google.com",
          testTitle: faker.random.words(4)
        };
    
        const testResponse = await supertest(app).post("/tests/create").send(body).set('Authorization', `Bearer ${token}`);
        const test = await prisma.test.findMany({});
    
        const disciplineName = faker.random.words(1);
        const testFilteredByDiscipline = await supertest(app).get(`/tests?groupBy=disciplines&filterDiscipline=${disciplineName}`).set('Authorization', `Bearer ${token}`);
    
        expect(testResponse.status).toEqual(201);
        expect(test).not.toBeNull();
        expect(testFilteredByDiscipline.body.tests[0].disciplines).toEqual([]);
      });
});

async function disconnect() {
  await prisma.$disconnect();
}

async function truncateTests() {
    await prisma.$executeRaw`TRUNCATE TABLE "TestViews", tests;`;
}
