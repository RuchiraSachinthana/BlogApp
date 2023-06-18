const express = require('express');
const router = express.Router();
const {time} = require('../controllers/blog');

// import controller methods
router.get('/', time);

module.exports = router;