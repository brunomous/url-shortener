import { saveUrl, getUrlBySlug, getShortUrlByHash } from "../repositories";
import { generateHashFromUrl, generateSlugFromHash } from "./hashing";

export const shortenUrl = async (
  url: string,
  protocol: string,
  host: string,
) => {
  try {
    const urlHash = await generateHashFromUrl(url);
    const urlSlug = await generateSlugFromHash(urlHash);
    const existingQueryRes = await getShortUrlByHash(urlHash);
    if (existingQueryRes?.slug) {
      return `${protocol}://${host}/${existingQueryRes.slug}`;
    }
    const saveQueryRes = await saveUrl({
      originalUrl: url,
      hash: urlHash,
      slug: urlSlug,
    });
    return `${protocol}://${host}/${saveQueryRes.slug}`;
  } catch (error) {
    throw error;
  }
};

export const getOriginalUrl = async (slug: string) => {
  try {
    const queryRes = await getUrlBySlug(slug);
    return queryRes.original_url;
  } catch (error) {
    throw error;
  }
};
