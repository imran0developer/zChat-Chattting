const mongoose = require('mongoose');
const express = require('express');
const User = require('../models/User');


const router = express.Router();

router.get('/', async (req, res) => {
    console.log("Userss route");
    try {
        const users = await User.find().sort({ timestamp: 1 });  // Await the query
        res.json(users);  // Return the users as JSON
    } catch (error) {
        console.error("Users Error: ", error);
        res.status(500).json({ message: 'Error fetching users' });
    }
});

module.exports = router;