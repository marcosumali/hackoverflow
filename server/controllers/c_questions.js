const ModelQuestion = require('../models/m_questions');
const ObjectId = require('mongodb').ObjectID;

class ControllerQuestion {
    
    static getQuestions (req,res) {
        ModelQuestion.find()
            .populate('UserId')
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'Find all questions successful',
                    questions: result,
                })
            })
            .catch(error => {
                res.status(400).json({
                    message: 'Error: Bad request get questions'
                })
            })
    }


    static save (req,res) {
        let {UserId,question} = req.body;
        
        let newObj = {
            UserId,
            question,
            upvote: [],
            downvote: []
        }
        // console.log(newObj);

        let newQuestion = new ModelQuestion(newObj);
        newQuestion.save((err,result) => {
            if (err) {
                res.status(400).json({
                    message: 'Error: Bad request save new question'
                })
            } else {
                res.status(201).json({
                    message: 'Save new question successful',
                    question: result,
                })
            }
        })
    }


    static delete (req,res) {
        let {id} = req.body;

        ModelQuestion.deleteOne({_id: ObjectId(id)})
            .then(result => {
                res.status(200).json({
                    message: 'Delete single question successful',
                    delete_status: result,
                })    
            })
            .catch(error => {
                res.status(400).json({
                    message: 'Error: Bad request delete single question'
                })  
            })

    }


    static upvote (req,res) {
        let {UserId,id} = req.body;

        ModelQuestion.findOne({_id: ObjectId(id)})
            .then(result => {

                let current_vote = result.upvote // array

                if (current_vote.length <= 0) {
                    current_vote.push(UserId)

                    ModelQuestion.update({_id: ObjectId(id)}, {upvote: current_vote})
                        .then(result => {
                            res.status(200).json({
                                message: 'Add one upvote to question successful',
                                update_status: result,
                            })
    
                        })
                        .catch(error => {
                            res.status(400).json({
                                message: 'Error: Bad request to add upvote to related questions'
                            })
            
                        })        
                
                } else {

                    current_vote.forEach(result => {
                        if (result == UserId) {
                            res.status(400).json({
                                message: 'Error: Each user only permitted to give one upvote per question'
                            })
    
                        } else {
                            current_vote.push(UserId)
    
                            ModelQuestion.update({_id: ObjectId(id)}, {upvote: current_vote})
                                .then(result => {
                                    res.status(200).json({
                                        message: 'Add one upvote to question successful',
                                        update_status: result,
                                    })
            
                                })
                                .catch(error => {
                                    res.status(400).json({
                                        message: 'Error: Bad request to add upvote to related questions'
                                    })
                    
                                })        
                        }
                    })
                }        
            })
            .catch(error => {
                res.status(400).json({
                    message: 'Error: Bad request find question to add vote'
                })
            })

    }


    static downvote (req,res) {
        let {UserId,id} = req.body;

        ModelQuestion.findOne({_id: ObjectId(id)})
            .then(result => {

                let current_downvote = result.downvote // array

                if (current_downvote.length <= 0) {

                    current_downvote.push(UserId)

                    ModelQuestion.update({_id: ObjectId(id)}, {downvote: current_downvote})
                        .then(result => {
                            res.status(200).json({
                                message: 'Add one downvote to question successful',
                                update_status: result,
                            })
    
                        })
                        .catch(error => {
                            res.status(400).json({
                                message: 'Error: Bad request to add downvote to related questions'
                            })
            
                        })

                } else {

                    current_downvote.forEach(result => {
                        if (result == UserId) {
                            res.status(400).json({
                                message: 'Error: Each user only permitted to give one downvote per question'
                            })
    
                        } else {
                            current_downvote.push(UserId)
    
                            ModelQuestion.update({_id: ObjectId(id)}, {downvote: current_downvote})
                                .then(result => {
                                    res.status(200).json({
                                        message: 'Add one downvote to question successful',
                                        update_status: result,
                                    })
            
                                })
                                .catch(error => {
                                    res.status(400).json({
                                        message: 'Error: Bad request to add downvote to related questions'
                                    })
                    
                                })        
                        }
                    })                
    
                }

            })
            .catch(error => {
                res.status(400).json({
                    message: 'Error: Bad request find question to add vote'
                })
            })

    }

}


module.exports = ControllerQuestion;