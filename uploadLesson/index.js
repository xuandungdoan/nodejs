const express = require('express');
const app = express();
const multer = require('multer')

app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(3000, () => {
    console.log('Server Start.')
})


var diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './upload')
    }
    ,
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

var upload = multer({storage:diskStorage})

app.post('/upload', upload.single('file'),(req, res) => {
    console.log(req.file);
    res.send('gui file thanh cong')
})


app.get('/', (req, res) => {
    res.render('home')
})