const express = require('express');
const router = express.Router();
const { register, login, getUser } = require('../controller/user');

router.post('/login', login);
router.post('/register', register);
router.get('/', getUser);

module.exports = router;
