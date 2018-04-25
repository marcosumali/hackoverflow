const ModelUser = require('../models/m_users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltrounds = Number(process.env.SALTROUNDS);
const secretkey = process.env.SECRETKEY;

class ControllerUser {

    static getUsers (req,res) {
        ModelUser.find()
            .then(result => {
                res.status(200).json({
                    message: 'Find all users successful',
                    users: result,
                })
            })
            .catch(error => {
                res.status(400).json({
                    message: 'Error: Bad request get users'
                })
            })
    }

    static save (req,res) {
        let {display_name,email,password} = req.body;
        let hash = bcrypt.hashSync(password, saltrounds);

        let newObj = {
            display_name,
            email,
            password: hash
        }
        // console.log(newObj);

        let newUser = new ModelUser(newObj);
        newUser.save((err,result) => {
            if (err) {
                res.status(400).json({
                    message: 'Error: Bad request save new user'
                })
            } else {
                let token = jwt.sign({_id: result._id}, secretkey);

                res.status(201).json({
                    message: 'Save new user successful',
                    user: result,
                    token: token
                })
            }
        })
    }


    static getUser (req,res) {
        let {email,password} = req.body;

        ModelUser.findOne({email: email})
            .then(result => {
                let hashCheck = bcrypt.compareSync(password, result.password); // true
                console.log(hashCheck);

                if (hashCheck == true) {
                    let token = jwt.sign({_id: result._id}, secretkey);

                    res.status(200).json({
                        message: 'Get single user successful',
                        user: result,
                        token: token
                    })    

                } else {
                    res.status(400).json({
                        message: 'Error: Bad request incorrect email or password'
                    })    
                }
            })
            .catch(error => {
                res.status(400).json({
                    message: 'Error: Bad request get single user'
                })
            })

    }


    static update (req,res) {
        let {display_name, email, password} = req.body;
        let hash = bcrypt.hashSync(password, saltrounds);

        let newObj = {          
            display_name: display_name,
            email: email,
            password: hash
        }

        ModelUser.findOneAndUpdate({email: email}, newObj)
            .then(result => {
                res.status(200).json({
                    message: 'Update single user successful',
                    user_previous: result,
                })    
            })
            .catch(error => {
                res.status(400).json({
                    message: 'Error: Bad request update single user'
                })
            })

    }


    static delete (req,res) {
        let {email} = req.body;

        ModelUser.deleteOne({email: email})
            .then(result => {
                res.status(200).json({
                    message: 'Delete single user successful',
                    delete_status: result,
                })    
            })
            .catch(error => {
                res.status(400).json({
                    message: 'Error: Bad request delete single user'
                })  
            })

    }



}


module.exports = ControllerUser;