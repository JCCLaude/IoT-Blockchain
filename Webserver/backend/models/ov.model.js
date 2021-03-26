const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ovSchema = new Schema({
  ovval: {
    type: Number,
    required: true,
    unique: false
  }
}, {
  timestamps: true,
});

const Overview = mongoose.model('Overview', ovSchema);

module.exports = Overview;