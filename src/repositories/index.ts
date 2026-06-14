import pool from "../db/pool";
import { type ShortUrl } from "../db/schemas";

export const getShortUrlByHash = async (hash: string) => {
  try {
    const queryText = "SELECT * FROM urls WHERE hash = $1";
    const queryResponse = await pool.query(queryText, [hash]);
    return queryResponse.rows[0];
  } catch (error) {
    throw error;
  }
};

export const saveUrl = async (data: ShortUrl) => {
  try {
    const queryText =
      "INSERT INTO urls (original_url, hash, slug) VALUES ($1, $2, $3) RETURNING id, slug";
    const queryResponse = await pool.query(queryText, [
      data.originalUrl,
      data.hash,
      data.slug,
    ]);
    return queryResponse.rows[0];
  } catch (error) {
    throw error;
  }
};

export const getUrlBySlug = async (slug: string) => {
  try {
    const queryText = "SELECT * FROM urls WHERE slug = $1";
    const queryResponse = await pool.query(queryText, [slug]);
    return queryResponse.rows[0];
  } catch (error) {
    throw error;
  }
};
