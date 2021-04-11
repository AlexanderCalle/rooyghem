const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const fs = require('fs');

module.exports = async (image, path) => {

    await imagemin([image], {
        destination: path,
        plugins: [
            imageminJpegtran(),
            imageminPngquant()
        ]
    }).then(() => {
        fs.unlinkSync(image)
    }).catch(err => {
        console.error(err);
    })
};
