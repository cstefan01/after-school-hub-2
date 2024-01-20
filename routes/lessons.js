const express = require('express');
const lessonsRequests = require('../requests/lessons');

const router = express.Router();

router.get('/lessons', lessonsRequests.getLessons);
router.get('/lessons/:id', lessonsRequests.getLessonByID);

module.exports = router;
