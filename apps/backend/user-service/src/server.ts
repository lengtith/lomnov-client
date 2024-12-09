import app from "@/src/app"
import configs from "@/src/config";
import Database from "@/src/database";
const startServer = async () => {
  const db = Database.getInstance();
  await db.connect();
  // Initialize and start your Express server here
  app.listen(configs.port, () => {
    console.log(`User service running on Port: ${configs.port}`)
  })
};

startServer();

