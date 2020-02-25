
const multer = require('multer')
const storage = multer.diskStorage({
destination: (req, file, cb) => cb(null, './lib'),
filename: (req, file , cb) => cb(null, file.originalname)
})
function fileFilter(req, file ,cb){
const {mimetype} = file
if(mimetype === 'image/png' ||mimetype === 'image/jpeg' )
return cb(null, true)
cb(new Error('dinh dang file khong dung', false))
}

const fileLimit = { fileSize: 102400}

const upload = multer({storage, fileFilter, fileLimit})
module.exports = upload