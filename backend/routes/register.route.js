const express = require('express');
const router = express.Router();
const { register } = require('../controller/auth.controller');

router.post("/", register);

module.exports = router;