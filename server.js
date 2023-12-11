const express = require('express');
const fs = require('fs');
const { MongoClient } = require('mongodb');


// ================ Server Config ================ 
const PORT = process.env.PORT || 3000;
const HOST = 'localhost';
// ================ Server Config ================ 

// ============ Database Server Config ===========
const DATABASE_NAME = "db_after_school_hub";
const LESSON_COLLECTION = "lesson";
const USERNAME = 'cstefan01';
const PASSWORD = 'database1';
const URI = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.s9daasc.mongodb.net/?retryWrites=true&w=majority`;
// ============ Database Server Config ===========

const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToMongoDB() {
    try {

        await client.connect();

        const db = client.db(DATABASE_NAME);
        const lesson_collection = db.collection(LESSON_COLLECTION);

    } catch (err) {
        console.error('Error connecting to MongoDB Atlas', err);
    }
}

connectToMongoDB();


const app = express();

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

app.listen(PORT, HOST, () => {
    console.log(`Server is listening on http://${HOST}:${PORT}`);
})




