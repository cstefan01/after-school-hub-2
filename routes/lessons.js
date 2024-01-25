const express = require('express');
const lessonsRequests = require('../requests/lessons');

const router = express.Router();

router.get('/lessons', lessonsRequests.getLessons);
router.get('/lessons/:id', lessonsRequests.getLessonByID);
router.post('/lessons', lessonsRequests.postLesson);
router.put('/lessons/:id', lessonsRequests.updateLessonSpaces)

module.exports = router;
