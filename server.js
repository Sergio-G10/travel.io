// server.js
"use strict";
const express = require("express");
const app = express();
require('dotenv').config();

const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('./auth/passport');

app.use(cors({
    origin: process.env.CLIENT_BASE_URL || 'http://localhost:5173',
    credentials: true,
    methods: 'GET,POST,PUT,DELETE'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        sameSite: 'lax'
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("public"));


// Routes
app.use('/journals', require('./routes/journalRoutes'));
app.use('/upload', require('./routes/upload'));
app.use('/auth', require('./auth/authRoute'));
app.use('/users', require('./routes/userRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
