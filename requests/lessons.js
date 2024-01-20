const { MongoClient, ObjectId } = require('mongodb');
const config = require('../conf/config');


const client = new MongoClient(config.dbUri);

const getLessons = async (req, res) => {
    try {
        await client.connect();

        const database = client.db(config.dbName);
        const lesson_collection = database.collection(config.db_lesson_collection);

        const lessons = await lesson_collection.find({}).toArray();

        res.json(lessons);
    } catch (err) {
        res.status(500).json({ message: err.message });
    } finally {
        await client.close();
    }
}

const getLessonByID = async (req, res) => {
    try {
        const lessonId = req.params.id;

        const database = client.db(config.dbName);
        const lesson_collection = database.collection(config.db_lesson_collection);

        // Find the lesson by its ID
        const lesson = await lesson_collection.findOne({ _id: new ObjectId(lessonId) });

        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }

        res.json(lesson);
    } catch (err) {
        console.error('Error fetching lesson', err);
        res.status(500).json({ error: 'Failed to fetch lesson' });
    }
}

module.exports = {
    getLessons,
    getLessonByID

}