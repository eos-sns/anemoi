const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  key: {type: String, unique: true, required: true},
  val: {type: String, required: true},
  time: {type: Date, required: true},
}, { collection : 'links' });

schema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('AstraeusLink', schema);