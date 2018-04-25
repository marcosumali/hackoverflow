var express = require('express');
var ControllerAnswer = require('../controllers/c_answers');

var router = express.Router();

router
  .get('/', ControllerAnswer.getAnswers)
  .post('/save', ControllerAnswer.save)
  .delete('/delete', ControllerAnswer.delete)
  .put('/upvote', ControllerAnswer.upvote)
  .put('/downvote', ControllerAnswer.downvote)


module.exports = router;
