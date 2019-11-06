const imagemin = require('imagemin')
const imageminMozjpeg = require('imagemin-mozjpeg')
const imageminPngquant = require('imagemin-pngquant')

let files
;(async () => {
  files = await imagemin(['static/img/*.{jpg,png}'], 'static/img', {
    plugins: [
      imageminMozjpeg({ quality: 65, progressive: true }),
      imageminPngquant({ quality: '65-80' })
    ]
  })
})()

module.exports = files
