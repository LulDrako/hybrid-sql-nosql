const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectMongo = require("./config/db.mongo");
const pool = require("./config/db.postgres");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

connectMongo();

const userRoutes = require("./routes/user.routes");
const bookRoutes = require("./routes/book.routes");
const profileRoutes = require("./routes/profile.routes");
const profileController = require("./controllers/profile.controller");

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
  res.status(500).json({ error: "Erreur interne serveur", details: err.message });
});

app.listen(PORT, () => console.log(`API prête sur http://localhost:${PORT}`));
