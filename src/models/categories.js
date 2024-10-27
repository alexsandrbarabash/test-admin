const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  cars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }],
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
});

exports.Category = mongoose.model('Category', categorySchema);
