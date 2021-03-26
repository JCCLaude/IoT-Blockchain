const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  noval: { 
    type: String, 
    required: true 
  },
  nodate:{
    type: Date
  }
}, {
  timestamps: true,
});

const NO2 = mongoose.model('NO2', exerciseSchema);

module.exports = NO2;