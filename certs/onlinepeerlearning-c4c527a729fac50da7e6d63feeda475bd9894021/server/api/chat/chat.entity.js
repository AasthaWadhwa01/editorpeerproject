const mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
  fromUserId: { type: String },
  message: { type: String },
  toUserId: { type: String },
  fromSocketId: { type: Number },
  timestamp: { type: Number }
});

module.exports = mongoose.model("message", MessageSchema);