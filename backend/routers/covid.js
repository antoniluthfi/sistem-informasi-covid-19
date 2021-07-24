const express = require('express');
const router = express.Router();
const {
    getAllData
} = require('../controller/covid');

router.get('/', getAllData);

module.exports = router;