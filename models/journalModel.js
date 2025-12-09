"use strict";
const pool = require('../models/db');

async function getAllJournals() {
  const query = `SELECT * FROM journals`;
  const result = await pool.query(query);
  return result.rows;
}


async function getOneJournalById(id) {
    const queryText = "SELECT * FROM journals where id = $1";
    const values = [id];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}


async function deleteJournal(id) {
    let queryText = "DELETE FROM journals WHERE id = $1 ";
    const values = [id];
    const result = await pool.query(queryText, values);
    return result.rowCount;
}

async function addJournal(title, latitude, longitude, startDate, endDate, textEntry, imgUrl) {
    let queryText = "INSERT INTO journals ( title, start_date, end_date, place_lat, place_lng, text_entry, \"imgUrl\") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
    let values = [title, startDate, endDate, latitude, longitude, textEntry, imgUrl];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

module.exports = {
    getAllJournals,
    getOneJournalById,
    deleteJournal,
    addJournal
};
