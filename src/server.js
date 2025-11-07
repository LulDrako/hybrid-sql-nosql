const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const connectMongo = require("./config/db.mongo");
const { globalLimiter, authLimiter } = require("./middlewares/rateLimiter");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(morgan("combined"));
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173"],
  credentials: true
}));
app.use(express.json());
app.use(globalLimiter);

connectMongo();

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const bookRoutes = require("./routes/book.routes");
const profileRoutes = require("./routes/profile.routes");
const profileController = require("./controllers/profile.controller");

app.use("/auth", authLimiter, authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/profiles", profileRoutes);
app.get("/api/user-full/:id", profileController.getUserFull);

app.get("/api/status", (req, res) => {
  res.json({ 
    status: "ok", 
    time: new Date().toISOString(),
    databases: {
      postgresql: "connected",
      mongodb: "connected"
    }
  });
});

app.use((req, res) => res.status(404).json({ error: "Route inconnue" }));

app.use((err, req, res, next) => {
  console.error("Erreur serveur:", err.message);
  res.status(500).json({ error: "Erreur interne serveur" });
});

app.listen(PORT, () => console.log(`API prête sur http://localhost:${PORT}`));
