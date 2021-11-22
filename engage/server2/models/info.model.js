const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const infoSchema = new Schema({
  userName: { type: String, required: true },
  
  RegNo: { type: Number, required: false },
  Maths: { type: Boolean, required: true },
  Physics: { type: Boolean, required: true },
  Chemistry: { type: Boolean, required: true },
//   date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Info = mongoose.model('Info', infoSchema);

module.exports = Info;



