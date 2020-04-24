const User = require('../models/user')
const express = require('express')
const router = express.Router()

const { getUserByID, getUser } = require('../controllers/user')
const { isSignedIn, isAdmin, isAuthenticated} = require('../controllers/auth')

router.param('userId', getUserByID)

router.get('user/:userId', getUser)


module.exports = router