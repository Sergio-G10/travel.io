"use strict";
const model = require('../models/journalModel');

async function fetchAllJournals(req, res) {
    console.log("Here from fetchAllJournals");

    try {
        const userID = req.user.id;
        const journals = await model.getAllJournals(userID);
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
            const userID = req.user.id;
            const journal = await model.getOneJournalById(id, userID);
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
            const userID = req.user.id;
            const deletedCount = await model.deleteJournal(id, userID);
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
    const userID = req.user.id;
    console.log("Received:", { title, latitude, longitude, startDate, endDate, textEntry, imageUrl });
    if (title && latitude && longitude && startDate && endDate && textEntry) {
        try {
            const newJournal = await model.addJournal(title, latitude, longitude, startDate, endDate, textEntry, imageUrl, userID || null);
            res.status(201).json(newJournal);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send(`Missing required fields! Got: title=${title}, latitude=${latitude}, longitude=${longitude} startDate=${startDate}, endDate=${endDate}, textEntry=${textEntry}`);
    }
}

async function editJournal(req, res) {
    const id = req.params.id;
    const { title, latitude, longitude, startDate, endDate, textEntry } = req.body;
    const userID = req.user.id;

    if (id && title && latitude && longitude && startDate && endDate && textEntry) {
        try {
            const updatedJournal = await model.editJournal(id, title, latitude, longitude, startDate, endDate, textEntry, userID);
            res.json(updatedJournal);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required fields or id!");
    }
}

module.exports = {
    fetchAllJournals,
    fetchJournalById,
    removeJournal,
    createJournal,
    editJournal
};
