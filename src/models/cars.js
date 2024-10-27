const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String,
  color: String,
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
});

exports.Car = mongoose.model('Car', carSchema);
