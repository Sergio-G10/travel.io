"use strict";
const express = require("express");
const router = express.Router();

const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:5173', // react frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true // Allow cookies and authentication headers
};

router.use(cors(corsOptions));
const journalController = require('../controllers/journalController');

router.get("/", journalController.fetchAllJournals);
router.get("/:id", journalController.fetchJournalById);
router.delete("/:id", journalController.removeJournal);
router.post("/", journalController.createJournal);
module.exports = router;