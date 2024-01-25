const fs = require('fs');
const path = require('path');

const get = (req, res, next) => {
    const imagePath = path.join(__dirname, '../images', req.params.filename); // Assuming images are stored in a folder named 'images'

    // Check if the file exists
    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            // File does not exist
            res.status(404).json({ error: 'Image not found' });
        } else {
            // File exists, continue to the next middleware
            next();
        }
    });
};



module.exports = {
    get

}