const compress_images = require("compress-images");
const fs = require('fs');

module.exports = (temp_path, path) => {
  // image = path to temporary image in temp folder
  // path = path to final destination image

  // loading solution?
  if(!isEmptyDir(temp_path)) {
    console.log("beginning compression");
    compress_images(
      temp_path + '/*.{jpg,JPG,jpeg,JPEG,png,svg,gif}', 
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
        if(err) console.log(err);
        if (completed === true) {
          try {
            fs.rmdirSync(temp_path, { recursive: true });
        
            console.log(`${temp_path} is deleted!`);
          } catch (err) {
              console.error(`Error while deleting ${temp_path}.`);
          }
        }
      }
    );
  } else {
    console.log('folder is empty');
  }

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

function isEmptyDir(dir) {
  try {
    fs.rmdirSync(dir);
  } catch (e) {
    return false
  }
  fs.mkdirSync(dir);
  return true
}
