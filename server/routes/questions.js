var express = require('express');
var ControllerQuestion = require('../controllers/c_questions');

var router = express.Router();

router
  .get('/', ControllerQuestion.getQuestions)
  .post('/save', ControllerQuestion.save)
  .delete('/delete', ControllerQuestion.delete)
  .put('/upvote', ControllerQuestion.upvote)
  .put('/downvote', ControllerQuestion.downvote)


module.exports = router;
