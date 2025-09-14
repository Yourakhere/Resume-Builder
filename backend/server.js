require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");
const resumeRoutes = require("./routes/resumeRoutes"); 
const app = express();
 
const authRoutes = require("./routes/authRoutes");  
 
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
 
connectDB();
 
app.use(express.json());
 
app.use("/api/auth", authRoutes);
 
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res, path) => {
      res.set("Access-Control-Allow-Origin", process.env.CLIENT_URL || "*");
    },
  })
);
app.use("/api/resume", resumeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});