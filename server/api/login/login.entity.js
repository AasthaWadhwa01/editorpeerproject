const mongoose = require('mongoose');

/*
 * This is a login schema, for persisting credentials of each user login in via git
 */

var LoginSchema = new mongoose.Schema({
    userName: { type: String },
    userId: { type: String, unique: true },
    updatedAt: { type: Date, default: Date.now },
    createdOn: Date,
    online: { type: String },
    timestamp: { type: Number },
    socketId: { type: String },
});
LoginSchema.statics.findOrCreate = require("find-or-create");
module.exports = mongoose.model("login", LoginSchema);