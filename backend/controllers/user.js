const User = require('../models/user')

exports.getUserByID = (req, res, next, id) => {
    User.findById(id).exec( (error, user)=> {
        if(error || !user){
            return res.status(400).json({
                error: "No user found in db"
            })
        }
        req.profile = user
        next()
    })
}

exports.getUser = (req, res) => {
    // Get back here for password
    return res.json(req.profile)
}