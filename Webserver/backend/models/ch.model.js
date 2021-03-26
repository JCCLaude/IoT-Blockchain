const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chSchema = new Schema({
  chval: {
    type: String,
    required: true
  },
  chdate:{
    type: Date
  }
}, {
  timestamps: true,
});

const CH4 = mongoose.model('CH4', chSchema);

module.exports = CH4;