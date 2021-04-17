const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tempSchema = new Schema({
  tempval: {
    type: Number,
    required: true,
    unique: false
  },
  tempdate:{
    type: Date, 
    required: true,
    unique: false
  },
  tempgeo: {
    type: String,
    required: true,
    unique: false
  }
}, {
  timestamps: true,
});

const Temp = mongoose.model('temp2', tempSchema);

module.exports = Temp;