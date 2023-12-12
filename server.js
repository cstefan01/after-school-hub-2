const express = require('express');
const fs = require('fs');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

// ================ Server Config ================ 
const PORT = process.env.PORT || 3000;
const HOST = 'localhost';
// ================ Server Config ================ 

// ============ Database Server Config ===========
const CLUSTER = 'cluster0';
const DATABASE_NAME = 'db_after_school_hub';
const LESSON_COLLECTION = 'lesson';
const ORDER_COLLECTION = 'order';
const USERNAME = 'cstefan01';
const PASSWORD = 'database1';
const URI = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.s9daasc.mongodb.net/?retryWrites=true&w=majority`;
// ============ Database Server Config ===========

const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true });


const app = express();


// ================== Middleware ========================== 
app.use(bodyParser.json());

const logger = (req, res, next) => {
    const { method, originalUrl, protocol } = req;
    const timestamp = new Date().toISOString();

    const logMessage = `[${timestamp}] ${method} ${originalUrl} - ${protocol}://${req.get('host')}${req.originalUrl}]\n`;

    fs.appendFile('./logs/request.log', logMessage, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });

    console.log(logMessage);

    next();
};

app.use(logger);

// ================== Middleware ========================== 

// ================== Lessons End Points ================== 
app.get('/lessons', async (req, res) => {
    try {
        await client.connect();

        const database = client.db(DATABASE_NAME);
        const lesson_collection = database.collection(LESSON_COLLECTION);

        const lessons = await lesson_collection.find({}).toArray();

        res.json(lessons);
    } catch (err) {
        res.status(500).json({ message: err.message });
    } finally {
        await client.close();
    }
});

app.get('/lessons/:id', async (req, res) => {
    try {
        const lessonId = req.params.id;

        const database = client.db(DATABASE_NAME);
        const lesson_collection = database.collection(LESSON_COLLECTION);

        // Find the lesson by its ID
        const lesson = await lesson_collection.findOne({ id: parseInt(lessonId) });

        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }

        res.json(lesson);
    } catch (err) {
        console.error('Error fetching lesson', err);
        res.status(500).json({ error: 'Failed to fetch lesson' });
    }
});

// ================== Lessons End Points ================== 

// ================== Orders End Points ================== 

app.post('/orders', async (req, res) => {
    try {
        const database = client.db(DATABASE_NAME);
        const order_collection = database.collection(ORDER_COLLECTION);

        const order = req.body;

        if (!order.order_id || !order.customer || !order.lessons || !order.sub_total || !order.total) {
            return res.status(400).json({ error: 'Invalid order data' });
        }

        const result = await order_collection.insertOne(order);

        if (result.acknowledged) {
            res.status(201).json({ message: 'Order created successfully', orderId: result.insertedId });
        } else {
            res.status(500).json({ error: 'Failed to create order' });
        }
    } catch (err) {
        console.error('Error creating order', err);
        res.status(500).json({ error: 'Failed to create order' });
    }
});

// ================== Orders End Points ================== 

app.listen(PORT, HOST, () => {
    console.log(`Server is listening on http://${HOST}:${PORT}`);
})




