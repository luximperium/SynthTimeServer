require('dotenv').config();

const express = require('express');
const router = express.Router();

const Users = require('../db').import('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


//Practice route for testing
router.get('/practice', function(req, res){
    res.send('Hey!! This is a user practice route!')
})

//Register User Route
router.post('/register', function (req, res) {

    Users.create({
        email: req.body.user.email,
        username: req.body.user.username,
        password: bcrypt.hashSync(req.body.user.password, 13),
        firstName: req.body.user.firstName,
        lastName: req.body.user.lastName,
        biography: req.body.user.biography,
        profilePicSrc: req.body.user.profilePicSrc,
    }) .then (
        function createSuccess(users) {
            let token = jwt.sign({id: users.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

            res.json({
                users: users,
                message: 'User successfully created!', 
                sessionToken: token
            });
        })
        .catch(err => res.status(500).json({ error: err })); 
});

//Login User Route
router.post('/login', function(req, res) {
    Users.findOne({
        where: {
            username: req.body.users.username
        }
    })  .then (function loginSuccess(users) {
        if (users) {
            bcrypt.compare(req.body.users.password, users.password, function (err, matches) {
                if (matches) {
                    let token = jwt.sign({id: users.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

                    res.status(200).json({ users: users,
                    message: 'User successfully logged in!',
                    sessionToken: token
                })
                } else {
                res.status(502).send ({ error: 'User does not exist.' })
                }
            });
        } else {
            res.status(500).json({ error: 'User does not exist.' })
        }
    })
        .catch (err => res.status(500).json({ error: err }))
})

//Get User Route - will not require authorization (for displaying user profiles)
//router.get('/profile', function(req, res){

//})


module.exports = router;