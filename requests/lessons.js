const { MongoClient, ObjectId } = require('mongodb');
const config = require('../conf/config');


const client = new MongoClient(config.dbUri);

const getLessons = async (req, res) => {
    console.log("request fired...")
    try {
        await client.connect();

        const query = {};

        // Check for search parameter
        if (req.query.search) {
            const searchRegex = new RegExp(req.query.search, 'i');
            // Use a case-insensitive regex for partial subject or location matching
            query.$or = [
                { subject: { $regex: searchRegex } },
                { location: { $regex: searchRegex } }
            ];
        }

        const database = client.db(config.dbName);
        const lesson_collection = database.collection(config.db_lesson_collection);

        const lessons = await lesson_collection.find(query).toArray();

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