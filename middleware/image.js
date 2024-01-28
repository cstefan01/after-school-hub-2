const fs = require('fs');
const path = require('path');

const getImage = (req, res, next) => {
    const image = path.join(__dirname, '../images', req.params.filename);

    fs.access(image, fs.constants.F_OK, (err) => {
        if (err) {
            res.status(404).send('Image not found');
        } else {
            res.sendFile(image);
        }
    });
};



module.exports = {
    getImage

}