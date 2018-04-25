const ModelAnswer = require('../models/m_answers');
const ObjectId = require('mongodb').ObjectID;

class ControllerAnswer {
    
    static getAnswers (req,res) {
        ModelAnswer.find()
            .populate('UserId')
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'Find all answers successful',
                    answers: result,
                })
            })
            .catch(error => {
                res.status(400).json({
                    message: 'Error: Bad request get answers'
                })
            })
    }

    static save (req,res) {
        let {UserId,answer,QuestionId} = req.body;
        
        let newObj = {
            UserId,
            QuestionId,
            answer,
            upvote: [],
            downvote: []
        }

        let newAnswer = new ModelAnswer(newObj);
        newAnswer.save((err,result) => {
            if (err) {
                res.status(400).json({
                    message: 'Error: Bad request save new answer'
                })
            } else {
                res.status(201).json({
                    message: 'Save new answer successful',
                    answer: result,
                })
            }
        })
    }


    static delete (req,res) {
        let {id} = req.body;

        ModelAnswer.deleteOne({_id: ObjectId(id)})
            .then(result => {
                res.status(200).json({
                    message: 'Delete single answer successful',
                    delete_status: result,
                })    
            })
            .catch(error => {
                res.status(400).json({
                    message: 'Error: Bad request delete single answer'
                })  
            })

    }


    static upvote (req,res) {
        let {UserId,id} = req.body;

        ModelAnswer.findOne({_id: ObjectId(id)})
            .then(result => {

                let current_vote = result.upvote // array

                if (current_vote.length <= 0) {
                    current_vote.push(UserId)

                    ModelAnswer.update({_id: ObjectId(id)}, {upvote: current_vote})
                        .then(result => {
                            res.status(200).json({
                                message: 'Add one upvote to answer successful',
                                update_status: result,
                            })
    
                        })
                        .catch(error => {
                            res.status(400).json({
                                message: 'Error: Bad request to add upvote to related answers'
                            })
            
                        })        
                
                } else {

                    current_vote.forEach(result => {
                        if (result == UserId) {
                            res.status(400).json({
                                message: 'Error: Each user only permitted to give one upvote per answer'
                            })
    
                        } else {
                            current_vote.push(UserId)
    
                            ModelAnswer.update({_id: ObjectId(id)}, {upvote: current_vote})
                                .then(result => {
                                    res.status(200).json({
                                        message: 'Add one upvote to answer successful',
                                        update_status: result,
                                    })
            
                                })
                                .catch(error => {
                                    res.status(400).json({
                                        message: 'Error: Bad request to add upvote to related answers'
                                    })
                    
                                })        
                        }
                    })
                }        
            })
            .catch(error => {
                res.status(400).json({
                    message: 'Error: Bad request find answer to add vote'
                })
            })

    }


    static downvote (req,res) {
        let {UserId,id} = req.body;

        ModelAnswer.findOne({_id: ObjectId(id)})
            .then(result => {

                let current_downvote = result.downvote // array

                if (current_downvote.length <= 0) {

                    current_downvote.push(UserId)

                    ModelAnswer.update({_id: ObjectId(id)}, {downvote: current_downvote})
                        .then(result => {
                            res.status(200).json({
                                message: 'Add one downvote to answer successful',
                                update_status: result,
                            })
    
                        })
                        .catch(error => {
                            res.status(400).json({
                                message: 'Error: Bad request to add downvote to related answers'
                            })
            
                        })

                } else {

                    current_downvote.forEach(result => {
                        if (result == UserId) {
                            res.status(400).json({
                                message: 'Error: Each user only permitted to give one downvote per answer'
                            })
    
                        } else {
                            current_downvote.push(UserId)
    
                            ModelAnswer.update({_id: ObjectId(id)}, {downvote: current_downvote})
                                .then(result => {
                                    res.status(200).json({
                                        message: 'Add one downvote to answer successful',
                                        update_status: result,
                                    })
            
                                })
                                .catch(error => {
                                    res.status(400).json({
                                        message: 'Error: Bad request to add downvote to related answers'
                                    })
                    
                                })        
                        }
                    })                
    
                }

            })
            .catch(error => {
                res.status(400).json({
                    message: 'Error: Bad request find answer to add vote'
                })
            })

    }




}


module.exports = ControllerAnswer;