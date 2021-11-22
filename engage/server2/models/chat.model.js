const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const valueSchema = new Schema({
    author:{type:String, required:true},
    message:{type:String, required:true}
});

const chatSchema = new Schema({
  room: { type: String, required: true },
  allValues: [{valueSchema}]
//   author: { type: String, required: true },
// //  time: { type: TimeRanges, required: true },
//   message: { type: String, required: true },
  
//   date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;



