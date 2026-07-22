import "dotenv/config";
import app from "./app";
import prisma from "./config/prisma";
import redisClient from "./config/redis";

const PORT = Number(process.env.PORT) || 3000;

async function startServer() {
  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully");

    if (process.env.REDIS_URL) {
      try {
        await redisClient.connect();
        console.log("✅ Redis connected successfully");
      } catch (redisError) {
        console.error("⚠️ Redis connection failed:", redisError);
        console.log("⚠️ Application will continue without caching");
      }
    }

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

startServer();