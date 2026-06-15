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
    const existingUrl = await getShortUrlByHash(urlHash);
    if (existingUrl?.slug) {
      return `${protocol}://${host}/${existingUrl.slug}`;
    }
    const savedUrl = await saveUrl({
      originalUrl: url,
      hash: urlHash,
      slug: urlSlug,
    });
    return `${protocol}://${host}/${savedUrl.slug}`;
  } catch (error) {
    throw error;
  }
};

export const getOriginalUrl = async (slug: string) => {
  try {
    const urlRecord = await getUrlBySlug(slug);
    return urlRecord.original_url;
  } catch (error) {
    throw error;
  }
};
