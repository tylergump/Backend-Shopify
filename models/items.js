const mongoose = require('mongoose')


const itemsSchema = new mongoose.Schema({
  name: {type: String, required: true},
  status: {type: String, required: true, enum: ['Active', 'Deleted']},
  qty: {type: Number, required: true},
})


module.exports = mongoose.model('Item', itemsSchema)