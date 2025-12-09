"use strict";
const pool = require('../models/db');

async function getAllJournals(userID) {
  const query = `SELECT * FROM journals WHERE user_id = $1 ORDER BY created_at DESC`;
  const values = [userID];
  const result = await pool.query(query, values);
  return result.rows;
}


async function getOneJournalById(id, userID) {
    const queryText = "SELECT * FROM journals where id = $1 AND user_id = $2";
    const values = [id, userID];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}


async function deleteJournal(id, userID) {
    let queryText = "DELETE FROM journals WHERE id = $1 AND user_id = $2";
    const values = [id, userID];
    const result = await pool.query(queryText, values);
    return result.rowCount;
}

async function addJournal(title, latitude, longitude, startDate, endDate, textEntry, imgUrl, userID) {
    let queryText = "INSERT INTO journals ( title, start_date, end_date, place_lat, place_lng, text_entry, \"imgUrl\", user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";
    let values = [title, startDate, endDate, latitude, longitude, textEntry, imgUrl, userID];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

async function editJournal(id, title, latitude, longitude, startDate, endDate, textEntry, userID) {
    let queryText = "UPDATE journals SET title=$1, start_date=$2, end_date=$3, place_lat=$4, place_lng=$5, text_entry=$6 WHERE id=$7 AND user_id=$8 RETURNING *";
    let values = [title, startDate, endDate, latitude, longitude, textEntry, id, userID];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

module.exports = {
    getAllJournals,
    getOneJournalById,
    deleteJournal,
    addJournal,
    editJournal
};
