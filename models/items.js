const mongoose = require('mongoose')


const itemsSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  price: {type: Number, default: false},
  qty: {type: Number, required: true}
})


module.exports = mongoose.model('Item', itemsSchema)