const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const coSchema = new Schema({
  coval: {
    type: Number,
    required: true,
    unique: false
  },
  codate:{
    type: Date, 
    required: true,
    unique: false
  },
  cogeo: {
    type: String,
    required: true,
    unique: false
  }
}, {
  timestamps: true,
});

const CO2 = mongoose.model('CO2', coSchema);

module.exports = CO2;