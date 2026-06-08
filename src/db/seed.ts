import pool from "./pool.ts";
import * as dbScripts from "./scripts.ts";

const seedData = async () => {
  try {
    await pool.query(dbScripts.dropTable);
    await pool.query(dbScripts.createTable);
    await pool.query(dbScripts.seedEntry);
    console.log("Database seeded successfully!");
    const items = await pool.query(dbScripts.listEntries);
    console.table(items.rows);
  } catch (error) {
    console.error("Error seeding the database", error);
  } finally {
    pool.end();
  }
};

seedData();
