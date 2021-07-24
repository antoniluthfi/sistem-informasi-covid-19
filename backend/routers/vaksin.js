const express = require('express');
const router = express.Router();
const { register } = require('../controller/vaksin');

router.post('/', register);

module.exports = router;
