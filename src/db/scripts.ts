export const dropTable = `
DROP TABLE IF EXISTS urls;
`;

export const createTable = `
CREATE TABLE urls (
  id SERIAL PRIMARY KEY,
  original_url TEXT NOT NULL,
  hash VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  clicks INTEGER NOT NULL DEFAULT 0
);
`;

export const seedEntry = `
INSERT INTO urls (original_url, hash, slug) VALUES
  ('https://www.google.com', '12345678', '/');
`;

export const listEntries = `
SELECT * from urls;
`;
