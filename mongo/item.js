const mongoose = require("mongoose")


const itemSchema = new mongoose.Schema({
    name: String,
    age: String,
    email:String,
    image:String
})

const item = mongoose.model('item',itemSchema)
module.exports = item