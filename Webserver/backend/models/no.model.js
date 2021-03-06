const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const noSchema = new Schema({
  noval: { 
    type: Number,
    required: true,
    unique: false
  },
  nodate:{
    type: Date,
    required: true,
    unique: false
  },
  nogeo: {
    type: String,
    required: true,
    unique: false
  }
}, {
  timestamps: true,
});

const NO2 = mongoose.model('NO2', noSchema);

module.exports = NO2;