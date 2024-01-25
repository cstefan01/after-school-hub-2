const { MongoClient, ObjectId } = require('mongodb');
const config = require('../conf/config');


const client = new MongoClient(config.dbUri);

client.connect()
    .then(() => {
        console.log('Connected to the database');
    })
    .catch(err => {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    });

const getLessons = async (req, res) => {
    try {
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

const postLesson = async (req, res) => {

    try {
        const database = client.db(config.dbName);
        const lesson_collection = database.collection(config.db_lesson_collection);

        const lesson = req.body;

        if (!lesson.icon || !lesson.subject || !lesson.location || !lesson.price || !lesson.spaces || !lesson.date || !lesson.starts_at || !lesson.ends_at || !lesson.image) {
            return res.status(400).json({ error: 'Invalid lesson data' });
        }

        const result = await lesson_collection.insertOne(lesson);

        if (result.acknowledged) {
            res.status(201).json({ message: 'lesson created successfully', lessonId: result.insertedId });
        } else {
            res.status(500).json({ error: 'Failed to create lesson' });
        }
    } catch (err) {
        console.error('Error creating lesson', err);
        res.status(500).json({ error: 'Failed to create lesson' });
    }
}

const updateLessonSpaces = async (req, res) => {
    try {
        const database = client.db(config.dbName);
        const lesson_collection = database.collection(config.db_lesson_collection);

        const lessonId = req.params.id;
        const { spaces } = req.body;

        // Validate if 'spaces' is a valid number
        if (isNaN(spaces) || spaces < 0) {
            return res.status(400).json({ error: 'Invalid spaces value' });
        }

        const result = await lesson_collection.updateOne(
            { _id: new ObjectId(lessonId) },
            { $set: { spaces: spaces } }
        );

        if (result.matchedCount === 0) {
            res.status(404).json({ error: 'Lesson not found' });
        } else {
            res.json({ message: 'Lesson spaces updated successfully' });
        }

    } catch (err) {
        console.error('Error updating lesson spaces:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

// Close the database connection when the server is shutting down
process.on('SIGINT', async () => {
    try {
        await client.close();
        console.log('Database connection closed');
        process.exit(0);
    } catch (err) {
        console.error('Error closing the database connection:', err);
        process.exit(1);
    }
});

module.exports = {
    getLessons,
    getLessonByID,
    postLesson,
    updateLessonSpaces
}