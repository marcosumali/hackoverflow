var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var questionSchema = mongoose.Schema({
    UserId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    question: String,
    upvote: Array,
    downvote: Array
});

var Question = mongoose.model('Question', questionSchema);

module.exports = Question;