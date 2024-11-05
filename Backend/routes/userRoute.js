const express = require('express');
const router = express.Router();
const registerUser = require('../controllers/registerUser');
const logIn = require('../controllers/loginUser');

router.post('/register/user', registerUser);
router.post('/login/user', logIn);

module.exports = router;