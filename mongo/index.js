const express = require('express');
const fs = require('fs')
const mongoose = require('mongoose')
const item = require('./item')
const upload = require('./multer')
const app = express();
const parser = require('body-parser').urlencoded({extended:false})
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req,res) => {
    item.findOne()
    .then((result)=>{
        res.render('index', {result})
    })
    .catch(err => console.log(err.message)
    )
});
app.get('/media', (req,res)=>{
    res.render('media')
})
app.post('/media',upload.single('image'), (req,res) => {
    const {name, age, email} = req.body;
    const image = req.file ? req.file.filename:'default.png'
    const product = new item({name, age, email,image});
    product.save()
    .then(()=>res.redirect('/'))
    .catch( err => res.send(err.message))
    
})
app.get('/admin',(req,res)=>{
    item.find({})
    .then((result) =>{
        res.render('admin', {result});
    })
    .catch( err => res.send(err.message))
   
})

app.get('/remove/:id', (req, res) => {
    const {id} = req.params
    item.findByIdAndRemove(id)
    .then((result) => {
        res.redirect('/admin')
        fs.unlink('./lib/' + result.image,(err) => {
            if(err)
                res.send(err.message)} )
})
    .catch( err => res.send(err.message))
})
//edit
app.get('/edit/:id', (req,res) => {
    const {id} = req.params;
    item.findById(id)
    .then( result => {
        res.render('edit2', { result}
        )
    })
    .catch(err => res.send(err))
})
app.post('/edit/:id', parser, upload.single("image"),(req, res) =>{
    const {id} = req.params
    const {name, email, age, oldImage} = req.body
    const image = req.file ? req.file.filename : oldImage;
    
    item.findByIdAndUpdate(id, {name, age, email,image})
    .then((e)=>{
        if(e.image != oldImage)
            fs.unlink("./lib/oldImage", err => {if(err) res.send(err.message)})
        res.redirect('/admin')
    })
    .catch(err => res.send(err.message))
})
mongoose.connect('mongodb://localhost/demo',{useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify: false})
mongoose.connection.once('open', ()=>{
    app.listen(3000, () => console.log('sever create'));
})
