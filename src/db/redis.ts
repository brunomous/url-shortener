import { createClient } from "redis";
import { type NewShortUrl } from "./types";

const client = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASSWORD,
});

client.on("error", (error) => console.error("Redis Client error", error));

export const cacheUrl = async (slug: string, data: NewShortUrl) => {
  await client.hSet(slug, data);
};

export const retrieveCachedUrl = async (slug: string) => {
  return client.hGetAll(slug);
};

await client.connect();
