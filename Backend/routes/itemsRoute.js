const express = require('express');
const router = express.Router();
const Item = require('../models/groceryItemsApi');

router.get('/items',Item);

module.exports = router;