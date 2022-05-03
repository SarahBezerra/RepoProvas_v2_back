import app from "../../src/app.js";
import supertest from 'supertest';
import userFactory from "./userFactory.js";
import userBodyFactory from "./userBodyFactory.js";

export async function generateToken() {
    const userBody = userBodyFactory();
    await userFactory(userBody);

    const response = await supertest(app).post("/sign-in").send(userBody);
    expect(response.status).toEqual(200);
    const token = response.body.token;

    return token;
}