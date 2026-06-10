import pool from "./pool";
import * as dbScripts from "./scripts";

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
