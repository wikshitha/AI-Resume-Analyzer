import "dotenv/config";
import app from "./app";
import prisma from "./config/prisma";
import redisClient from "./config/redis";

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await prisma.$connect();
    console.log("✅ Database Connected Successfully");

     await redisClient.connect();
    console.log("✅ Redis Connected Successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to database:", error);
    process.exit(1);
  }
}

startServer();