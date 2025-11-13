// Load environment variables FIRST
import "./config/env.js";

import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chat.js";
import characterRoutes from "./routes/characters.js";
import assistantRoutes from "./routes/assistant.js";
import quizRoutes from "./routes/quiz.js";
import timelineRoutes from "./routes/timeline.js";
import profileRoutes from "./routes/profiles.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:5173",
  "https://giakhoi0123.github.io", // GitHub Pages
  "http://localhost:5173" // Local development
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.some(allowed => origin.startsWith(allowed))) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use("/audio", express.static("audio"));
app.use("/img", express.static("../img"));

// Routes
app.use("/api/chat", chatRoutes);
app.use("/api/characters", characterRoutes);
app.use("/api/assistant", assistantRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/timeline", timelineRoutes);
app.use("/api/profiles", profileRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "EduVerse Backend is running",
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start server (only if not in serverless environment)
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 EduVerse Backend running on http://localhost:${PORT}`);
    console.log(`📝 Environment: ${process.env.NODE_ENV || "development"}`);
    console.log(
      `🔗 Frontend URL: ${process.env.FRONTEND_URL || "http://localhost:5173"}`
    );
  });
}

// Export for Vercel serverless
export default app;
