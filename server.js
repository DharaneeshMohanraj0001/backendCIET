const app       = require("./src/app");
const connectDB = require("./src/config/db");
const http      = require("http");
const { Server } = require("socket.io");

const PORT   = process.env.PORT || 5000;
const server = http.createServer(app);
const io     = new Server(server, { cors: { origin: "*" } });

// In-memory active student tracking
const activeStudents = new Map();

io.on("connection", (socket) => {
  socket.on("join_exam", (userData) => {
    activeStudents.set(socket.id, { ...userData, socketId: socket.id, startTime: Date.now() });
    io.emit("active_students", Array.from(activeStudents.values()));
  });

  socket.on("submit_exam", () => {
    activeStudents.delete(socket.id);
    io.emit("active_students", Array.from(activeStudents.values()));
  });

  socket.on("disconnect", () => {
    activeStudents.delete(socket.id);
    io.emit("active_students", Array.from(activeStudents.values()));
  });
});

app.set("io", io);
app.set("activeStudents", activeStudents);

// Start server first, then connect DB with retries
server.listen(PORT, () => {
  console.log(`✅ Server & WebSockets running on http://localhost:${PORT}`);
});

connectDB().catch((err) => {
  console.error("❌ DB Connection Failed:", err.message);
  console.log("⚠️  Server is running but DB is unavailable. API calls will fail until DB connects.");
  // Keep server alive — do NOT process.exit()
});
