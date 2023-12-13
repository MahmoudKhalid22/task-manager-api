const request = require("supertest");
const app = require("../app");

test("Should signup a new user", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "ali",
      email: "ali.khalid@hamd.com",
      password: "admin123!",
    })
    .expect(200);
});
