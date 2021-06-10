const multer = require('multer')

const MIME_TYPE = {
    'images/jpg': 'jpg',
    'images/jpeg': 'jpg',
    'images/png': 'jpg',
}

const storage = multer.diskStorage({
    destination: (req, files, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_')
        const extension = MIME_TYPE[file.mimetype]
        callback(null, name + Date.now() + '.' + extension)
    }
})

module.exports = multer({ storage }).single('image')