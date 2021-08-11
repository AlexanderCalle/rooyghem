const compress_images = require("compress-images");
const fs = require('fs');

module.exports = (image, path) => {
    compress_images(
        image, 
        path,
        { compress_force: false, statistic: true, autoupdate: true },
        false,
        { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
        { png: { engine: "pngcrush", command: ["--quality=20-50"] } },
        { svg: { engine: "svgo", command: "--multipass" } },
        {
        gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] },
        },
        function (err, completed) {
            if (completed === true) {
              fs.unlinkSync(image);
            } else {
                console.log(err);
            }
          }
    );

    // await imagemin([image], {
    //     destination: path,
    //     plugins: [
    //         imageminJpegtran(),
    //         imageminPngquant({
    //             quality: [0.6, 0.8],
    //         })
    //     ]
    // }).then(() => {
    //     fs.unlinkSync(image)
    // })
};
