const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pm10Schema = new Schema({
  pm10val: {
    type: Number,
    required: true,
    unique: false
  },
  pm10date:{
    type: Date,
    required: true,
    unique: false
  },
  pm10geo: {
    type: String,
    required: true,
    unique: false
  }
}, {
  timestamps: true,
});

const PM10 = mongoose.model('PM10', pm10Schema);

module.exports = PM10;