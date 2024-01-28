const fs = require('fs');
const path = require('path');

const getImage = (req, res, next) => {
    const imagePath = path.join(__dirname, '../images', req.params.filename);

    // Check if the image file exists
    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            // If the file doesn't exist, send a 404 response
            return res.status(404).send('Image not found');
        }

        // If the file exists, set the appropriate headers and send the file
        res.setHeader('Content-Type', 'image/jpeg'); // Adjust the content type based on your image type
        fs.createReadStream(imagePath).pipe(res);
    });
};



module.exports = {
    getImage

}