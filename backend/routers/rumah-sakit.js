const express = require('express');
const router = express.Router();
const { getRumahSakit } = require('../controller/rumah-sakit');

router.get('/', getRumahSakit);

module.exports = router;
