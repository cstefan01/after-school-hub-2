const fs = require('fs');

const recordRequest = (req, res, next) => {
    const { method, originalUrl, protocol } = req;
    const timestamp = new Date().toISOString();

    const logMessage = `[${timestamp}] ${method} ${originalUrl} - ${protocol}://${req.get('host')}${req.originalUrl}]\n`;

    fs.appendFile('../logs/request.log', logMessage, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });

    console.log(logMessage);

    next();
};

module.exports = {
    recordRequest
}