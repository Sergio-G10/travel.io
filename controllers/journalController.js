"use strict";
const model = require('../models/journalModel');

async function fetchAllJournals(req, res) {
    try {
        const journals = await model.getAllJournals();
        res.json(journals);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

async function fetchJournalById(req, res) {
    const id = req.params.id;
    if (id) {
        try {
            const journal = await model.getOneJournalById(id);
            res.json(journal);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required id param!");
    }
}

async function removeJournal(req, res) {
    const id = req.params.id;
    if (id) {
        try {
            const deletedCount = await model.deleteJournal(id);
            if (deletedCount > 0) {
                res.send(`Journal with id ${id} deleted successfully.`);
            } else {
                res.status(404).send("Product not found.");
            }
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required id param!");
    }
}

async function createJournal(req, res) {
    const { title, latitude, longitude, startDate, endDate, textEntry, imageUrl } = req.body;
    console.log("Received:", { title, latitude, longitude, startDate, endDate, textEntry, imageUrl });
    if (title && latitude && longitude && startDate && endDate && textEntry) {
        try {
            const newJournal = await model.addJournal(title, latitude, longitude, startDate, endDate, textEntry, imageUrl || null);
            res.status(201).json(newJournal);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send(`Missing required fields! Got: title=${title}, latitude=${latitude}, longitude=${longitude} startDate=${startDate}, endDate=${endDate}, textEntry=${textEntry}`);
    }
}

module.exports = {
    fetchAllJournals,
    fetchJournalById,
    removeJournal,
    createJournal
};
