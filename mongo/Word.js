const mongoose = require('mongoose');

const uri = "mongodb://localhost/myproject";

const wordschema = new mongoose.Schema({
    vn: String,
    en:String
});

const Word = mongoose.model('word', wordschema);

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once( 'open' ,() =>{
    const picture = new Word({en:'picture', vn:'buc hinh'});
    // picture.save()
    // .then(()=> console.log('save success')
    // )
})
module.exports = Word