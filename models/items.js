const mongoose = require('mongoose')


const itemsSchema = new mongoose.Schema({
  name: {type: String, required: true},
  deleted: {type: Boolean, default: false},
  qty: {type: Number, required: true},
  deletionReason: {type: String, required: false}
})


module.exports = mongoose.model('Item', itemsSchema)