const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const seatSchema = new Schema({
  maths: { type: Number, required: true },
  physics: { type: Number, required: true },
  chemistry: { type: Number, required: true },
//   date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Seat = mongoose.model('Seat', seatSchema);

module.exports = Seat;



