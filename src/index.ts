import { app } from "./app";

const PORT = process.env.PORT || 3000;

async function startServer() {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Error starting server: ", error);
  process.exit(1);
});
