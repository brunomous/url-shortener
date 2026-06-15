import { createHash } from "crypto";
import { adjectives, connectors, nouns } from "../constants";

export const generateHashFromUrl = async (url: string) => {
  return createHash("sha256").update(url).digest("hex");
};

export const generateSlugFromHash = async (hash: string) => {
  const adjectiveIndex = parseInt(hash.slice(0, 20), 16) % adjectives.length;
  const connectorIndex = parseInt(hash.slice(4, 20), 16) % connectors.length;
  const nounIndex = parseInt(hash.slice(8, 20), 16) % nouns.length;
  return `${adjectives[adjectiveIndex]}-${connectors[connectorIndex]}-${nouns[nounIndex]}`;
};
