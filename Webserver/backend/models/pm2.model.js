const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pm2Schema = new Schema({
  pm2val: {
    type: Number,
    required: true,
    unique: false
  },
  pm2date:{
    type: Date,
    required: true,
    unique: false
  },
  pm2geo: {
    type: String,
    required: true,
    unique: false
  }
}, {
  timestamps: true,
});

const PM2 = mongoose.model('PM2', pm2Schema);

module.exports = PM2;