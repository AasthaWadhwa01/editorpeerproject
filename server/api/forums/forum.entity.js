var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//knowledge base forum schema
var forumSchema = new Schema({
    userName: { type: String },
    questionTitle: { type: String },
    problemDescription: { type: String },
    likes: [{userId:{type: String}}],
    dislikes:[{userId:{type: String}}],
    date: { type: String },
    time: { type: String },
    answers: [{ username: { type: String }, answer: { type: String }, codeSnippet: { type: String }, likes: [{userId:{type: String}}], dislikes: [{userId:{type: String}}], date: { type: String } }],
    votes: { type: String },
    codeSnippet: { type: String },
    tags: [{display:{ type:String},value:{type:String}}],
});

//exporting the forumSchema file
module.exports = mongoose.model('forum', forumSchema)