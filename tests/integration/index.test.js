import request from "supertest";
import { app } from "../../src/app";

describe("App", () => {
  it("Shortens a valid URL", async () => {
    const res = await request(app)
      .post("/")
      .send({ url: "https://example.com/" });

    expect(res.status).toBe(200);
    expect(res.text).toContain("Hello, world!");
  });

  it("Redirects a short URL to the original address", async () => {
    const res = await request(app).get("/12345");

    expect(res.status).toBe(200);
    expect(res.text).toContain("Hello, world!");
  });
});
