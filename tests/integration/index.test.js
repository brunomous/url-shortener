import request from "supertest";
import { app } from "../../src/app";

describe("URL Shortener", () => {
  it("Shortens a valid URL", async () => {
    const res = await request(app)
      .post("/")
      .send({ url: "https://example.com/" });
    expect(res.status).toBe(201);
    expect(res.text).toContain("shortUrl");
  });

  it("Redirects a short URL to the original address", async () => {
    const res = await request(app).get("/amber-alpine-brook");
    expect(res.status).toBe(302);
  });
});
