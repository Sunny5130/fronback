const express = require('express');
const router = express.Router();

const { handelPostUrl } = require("../controllers/url");

router.post('/', handelPostUrl);

module.exports = router;
