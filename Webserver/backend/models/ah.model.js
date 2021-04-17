const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ahSchema = new Schema({
  ahval: {
    type: Number,
    required: true,
    unique: false
  },
  ahdate:{
    type: Date, 
    required: true,
    unique: false
  },
  ahgeo: {
    type: String,
    required: true,
    unique: false
  }
}, {
  timestamps: true,
});

const AH = mongoose.model('ah2', ahSchema);

module.exports = AH;