const mongoose = require("mongoose");

const MONGO_OPTS = {
  maxPoolSize:              20,
  serverSelectionTimeoutMS: 10000,   // 10s per attempt
  socketTimeoutMS:          45000,
  heartbeatFrequencyMS:     10000,
  connectTimeoutMS:         15000,
  retryWrites:              true,
  retryReads:               true,
};

async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("MONGO_URI not found in .env");

  let attempts = 0;
  const MAX_RETRIES = 5;

  while (attempts < MAX_RETRIES) {
    try {
      attempts++;
      console.log(`🔄 Connecting to MongoDB... (attempt ${attempts}/${MAX_RETRIES})`);
      await mongoose.connect(uri, MONGO_OPTS);
      console.log("✅ MongoDB Connected (pool: 20)");
      await dropStaleIndexes();

      // Handle disconnection — auto-reconnect
      mongoose.connection.on("disconnected", () => {
        console.log("⚠️  MongoDB disconnected. Reconnecting...");
        setTimeout(() => reconnectDB(uri), 3000);
      });

      mongoose.connection.on("error", (err) => {
        console.error("MongoDB error:", err.message);
      });

      return; // success
    } catch (err) {
      console.log(`❌ Attempt ${attempts} failed: ${err.message}`);
      if (attempts < MAX_RETRIES) {
        const wait = attempts * 2000; // 2s, 4s, 6s, 8s backoff
        console.log(`⏳ Retrying in ${wait / 1000}s...`);
        await new Promise(r => setTimeout(r, wait));
      } else {
        throw new Error(`MongoDB connection failed after ${MAX_RETRIES} attempts: ${err.message}`);
      }
    }
  }
}

async function reconnectDB(uri) {
  if (mongoose.connection.readyState === 1) return; // already connected
  try {
    await mongoose.connect(uri, MONGO_OPTS);
    console.log("✅ MongoDB Reconnected");
  } catch (err) {
    console.log("❌ Reconnect failed:", err.message);
    setTimeout(() => reconnectDB(uri), 5000);
  }
}

async function dropStaleIndexes() {
  try {
    const db = mongoose.connection.db;
    const certIndexes = await db.collection("certificates").indexes();
    const stale = certIndexes.find(ix => ix.name === "certificateId_1");
    if (stale) {
      await db.collection("certificates").dropIndex("certificateId_1");
      console.log("🧹 Dropped stale certificateId_1 index");
    }
  } catch (err) {
    // Non-fatal — collection may not exist yet
  }
}

module.exports = connectDB;
