const fs = require('fs');
const path = require('path');

const getImage = (req, res, next) => {
    // Assuming the image path is provided in the request URL
    const imagePath = path.join(__dirname, '../images', req.params.filename);

    // Check if the file exists
    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            // If the file does not exist, send a 404 response
            res.status(404).send('Image not found');
        } else {
            // If the file exists, send the image as a response
            res.sendFile(imagePath);
        }
    });
};



module.exports = {
    getImage

}