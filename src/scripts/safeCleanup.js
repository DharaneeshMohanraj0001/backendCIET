require("dotenv").config({ path: __dirname + "/../../.env" });
const mongoose = require("mongoose");

async function runCleanup() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB for cleanup...");

        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();
        const collectionNames = collections.map((c) => c.name);

        console.log("Current collections:", collectionNames);

        // 1. Drop unused collections safely
        const toDrop = ["Submission", "problems", "assessmentattempts"];
        for (const name of toDrop) {
            if (collectionNames.includes(name)) {
                await db.collection(name).drop();
                console.log(`Dropped unused collection: ${name}`);
            }
        }

        // 2. Rename assessmentattempts to attempts
        if (collectionNames.includes("assessmentattempts")) {
            await db.collection("assessmentattempts").rename("attempts");
            console.log("Renamed 'assessmentattempts' to 'attempts'.");
        } else {
            console.log("'assessmentattempts' collection not found or already renamed.");
        }

        console.log("✅ Cleanup complete. Safe to exit.");
        process.exit(0);
    } catch (err) {
        console.error("❌ Cleanup failed:", err);
        process.exit(1);
    }
}

runCleanup();
