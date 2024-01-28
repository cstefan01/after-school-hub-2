const express = require('express');
const { getImage } = require('../middleware/image');

const router = express.Router();

router.get('/images/:filename', getImage);

module.exports = router;