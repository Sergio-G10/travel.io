"use strict";
require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");

// Enable CORS **before any routes**
app.use(cors({
  origin: "http://localhost:5173", // your React dev server
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));

// Body parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes
const journalRoutes = require('./routes/journalRoutes');
const uploadRoutes = require('./routes/upload'); // make sure this exists

app.use('/journals', journalRoutes);
app.use('/upload', uploadRoutes); // mounted after CORS

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("Server listening on port: " + PORT + "!");
});
