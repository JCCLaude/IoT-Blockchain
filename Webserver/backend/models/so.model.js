const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const soSchema = new Schema({
  soval: {
    type: Number,
    required: true,
    unique: false
  },
  sodate:{
    type: Date,
    required: true,
    unique: false
  },
  sogeo: {
    type: String,
    required: true,
    unique: false
  }
}, {
  timestamps: true,
});

const SO2 = mongoose.model('SO2', soSchema);

module.exports = SO2;