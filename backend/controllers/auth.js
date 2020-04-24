const User = require('../models/user')
const { validationResult } = require('express-validator');
var jwt = require('jsonwebtoken')
var expressJwt = require('express-jwt')

exports.signup = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const user = new User(req.body)
    user.save((error, user) => {
        if (error) {
            return res.json({
                err: 'NOT able to save user in DB'
            })
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        })
    })
}

exports.signin = (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array()});
    }

    User.findOne({email}, (err, user) => {
        if(err || !user){
            res.status(404).json({error: "User doesn't exit"})
        }
        
        if(!user.authenticate(password)){
            return res.status(401).json({error: "Email and password do not match"})
        }

        // Create Tocken
        const token = jwt.sign({ _id: user._id }, process.env.SECRET)
        // Put token in cookie
        res.cookie("token", token, {expire: new Date() + 9999});

        // send response to front end 
        const { _id, name, email, role } = user
        return res.json({token, user: { _id, name, email, role }})

    })
}

exports.signout = (req, res) => {
    res.clearCookie("token")
    res.json({
        message: "User Sign Out"
    })
}

// protected routes 
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
})

// custom middleware
exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id
    if(!checker){
        return res.status(404).json({
            error: "ACCESS DENIED"
        })
    }
    next()
}

exports.isAdmin = (req, res, next) => {
    if(req.profile.role === 0){
        return res.status(403).json({
            error: "you are not admin, ACCESS DENIED"
        })
    }
    next()
}