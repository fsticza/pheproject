const imagemin = require('imagemin')
const imageminMozjpeg = require('imagemin-mozjpeg')
const imageminPngquant = require('imagemin-pngquant')
const FILE_DIR = 'static/img'
let files
;(async () => {
  files = await imagemin([`${FILE_DIR}/*.{jpg,png}`], FILE_DIR, {
    plugins: [
      imageminMozjpeg({ quality: 65 }),
      imageminPngquant({ quality: '65-80' })
    ]
  })
})()

module.exports = files
