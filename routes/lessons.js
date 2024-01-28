const express = require('express');
const { getLessons, getLessonByID, postLesson, updateLessonSpaces } = require('../requests/lessons');

const router = express.Router();

router.get('/lessons', getLessons);
router.get('/lessons/:id', getLessonByID);
router.post('/lessons', postLesson);
router.put('/lessons/:id', updateLessonSpaces)

module.exports = router;
