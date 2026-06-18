import pool from "../db/pool";
import { cacheUrl, retrieveCachedUrl } from "../db/redis";
import { type NewShortUrl } from "../db/types";

export const getShortUrlByHash = async (hash: string) => {
  try {
    const text = "SELECT * FROM urls WHERE hash = $1";
    const result = await pool.query(text, [hash]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

export const saveUrl = async (newUrl: NewShortUrl) => {
  try {
    const text =
      "INSERT INTO urls (original_url, hash, slug) VALUES ($1, $2, $3) RETURNING id, slug";
    const result = await pool.query(text, [
      newUrl.originalUrl,
      newUrl.hash,
      newUrl.slug,
    ]);
    await cacheUrl(newUrl.slug, newUrl);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

export const getUrlBySlug = async (slug: string) => {
  try {
    const cached = await retrieveCachedUrl(slug);
    if (cached?.originalUrl) {
      return cached;
    }
    const text = "SELECT * FROM urls WHERE slug = $1";
    const result = await pool.query(text, [slug]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};
