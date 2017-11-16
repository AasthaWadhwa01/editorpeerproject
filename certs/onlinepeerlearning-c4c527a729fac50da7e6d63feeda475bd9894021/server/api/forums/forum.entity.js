var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//knowledge base forum schema
var forumSchema = new Schema({
    username: { type: String },
    questionTitle: { type: String },
    problemDescription: { type: String },
    date: { type: String },
    time: { type: String },
    answers: [{ username: { type: String }, answer: { type: String }, codeSnippet: { type: String }, likes: Number, dislikes: Number, date: { type: String } }],
    votes: { type: String },
    codeSnippet: { type: String },
    tags: { type: String }
});

//exporting the forumSchema file
module.exports = mongoose.model('forum', forumSchema)