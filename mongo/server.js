const express = require('express');
const mongoose = require('mongoose')
const parser = require('body-parser').urlencoded({extended:false})
const word = require('./Word')


const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req,res) => {
    word.find({})
    .then(result => res.render('home', {arr: result}))
});

app.get('/remove/:id', (req, res) => {
    const {id} = req.params
    word.findByIdAndRemove(id)
    .then(() => res.redirect('/'))
    .catch(err => res.send(err))
})

app.post('/add', parser, (req,res) =>{
    const {vn,en} = req.body
    const newWord = new word({en, vn})
    newWord.save()
    .then(() => res.redirect('/'))
    .catch(err => res.send(err))
})

app.get('/edit/:id', (req,res) => {
    const {id} = req.params;
    word.findById(id)
    .then( result => {
        res.render('edit', {object: result})
    })
    .catch(err => res.send(err))
})
app.post('/edit/:id', parser, (req, res) => {
    const {id} = req.params
    const {en, vn} = req.body
    word.findByIdAndUpdate(id , {en, vn})
    .then(() => res.redirect('/'))
    .catch(err => res.send(err))
})
mongoose.connect('mongodb://localhost/myproject',{ useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify:true });
mongoose.connection.once('open', () => {
    app.listen(3000, () => console.log('sever create'));
})