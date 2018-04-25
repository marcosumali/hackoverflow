var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var answerSchema = mongoose.Schema({
    UserId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    QuestionId: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },
    answer: String,
    upvote: Array,
    downvote: Array
});

var Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;