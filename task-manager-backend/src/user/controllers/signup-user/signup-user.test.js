const request = require("supertest");
const app = require("../../../app");
const database = require("../../../config/mongodb-config");

beforeEach(async () => {
    await database.connect();
});

describe("Signup User", () => {
    it("should return 201 status code", async () => {
        const response = await request(app).post("/users/signup").send({
            username: "test",
            email: "9yxib.test@inbox.testmail.app",
            password: "test@123",
            isAdmin: false,
        });

        expect(response.statusCode).toBe(201);
    });
});
