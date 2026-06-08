export const dropTable = `
DROP TABLE IF EXISTS urls;
`;

export const createTable = `
CREATE TABLE urls (
  id SERIAL PRIMARY KEY,
  original_url VARCHAR(255) NOT NULL,
  hash VARCHAR(255) NOT NULL,
  short_url VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL
);
`;

export const seedEntry = `
INSERT INTO urls (original_url, hash, short_url, slug) VALUES
  ('https://www.google.com', '12345678', 'https://short.url/google', '/')
`;

export const listEntries = `
SELECT * from urls;
`;
