const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const registerUser = require('../controllers/registerUser');

router.post('/register/user', registerUser);

module.exports = router;