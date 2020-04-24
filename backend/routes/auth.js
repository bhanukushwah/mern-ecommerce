const {signup, signout, signin, isSignedIn} = require('../controllers/auth')
const { check } = require('express-validator');
var express = require('express')
var router = express.Router()


router.post('/signup', [
    check('name').isLength({min: 3}).withMessage("name should be at least 3 characters"),
    check('email').isEmail().withMessage("Enter correct email"),
    check('password').isLength({min: 8}).withMessage('should be at least 8 characters')
], signup)

router.post('/signin', 
[
    check('email').isEmail().withMessage("Enter correct email"),
    check('password').isLength({min: 8}).withMessage('Password is required')
], signin)


router.get('/signout', signout)


// router.get('/testroute', isSignedIn, (req, res) => {
//     res.json(req.auth);
// })

module.exports = router