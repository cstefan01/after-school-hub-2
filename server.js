const express = require('express');
const fs = require('fs');

const PORT = process.env.PORT || 3000;
const HOST = 'localhost';

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




