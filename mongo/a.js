const {MongoClient, ObjectId} = require('mongodb');
const express = require('express');
const parser =  require('body-parser').urlencoded({extended : false})

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');

let wordsQuery;
app.get('/', (req,res) => {
    wordsQuery.find().toArray()
    .then(result => {
        res.render('home', { arr : result })
    })
    .catch( err => res.send(err.message))
    
})

app.post('/add', parser , (req,res) => {
    const {vn , en} = req.body;
    console.log(vn, en, req.body);
    wordsQuery.insert({vn, en})
    .then(() => { res.redirect('/')})
    .catch (err => res.send(err.message))
})

app.get('/remove/:id', (req,res) =>{
    const {id} = req.params;
    wordsQuery.remove({_id: ObjectId(id) })
    .then( () => res.redirect('/'))
    .catch( err => res.send(err.message))
})

app.get('/edit/:id', (req, res) => {
    const {id} = req.params;
    wordsQuery.findOne({_id: ObjectId(id)})
    .then( (result) => {
        console.log(result)
        res.render('edit',{ object: result}) })
    .catch( err => res.send(err.message))
})

app.post('/edit/:id',parser, (req,res) =>{
    const {id} = req.params;
    const {vn , en} = req.body;
    wordsQuery.updateOne({_id: ObjectId(id)},{ en, vn} )
    .then( () => res.redirect('/'))
    .catch( err => res.send(err.message))
})

var url = 'mongodb://localhost:27017/myproject';

MongoClient.connect(url)
.then(db => {
    app.listen(3000, () => {
        console.log('server start')
    })
    wordsQuery = db.collection('words');
})
.catch( err => console.log(err.message));

