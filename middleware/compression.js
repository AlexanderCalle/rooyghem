const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const fs = require('fs');

module.exports = async (image, path) => {
    console.log(image);
    imagemin([image], {
        destination: path,
        plugins: [
            imageminJpegtran(),
            imageminPngquant({
                quality: [0.6, 0.8],
            })
        ]
    }).then(() => {
        fs.unlinkSync(image)
    })
};
