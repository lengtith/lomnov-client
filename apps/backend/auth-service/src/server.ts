import app from "@/src/app"
import configs from "@/src/config";


const startServer = async () =>
  // Initialize and start your Express server here
  app.listen(configs.port, () => {
    console.log(`Auth service running on Port: ${configs.port}`)
  })


startServer();

