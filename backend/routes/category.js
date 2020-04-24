const express = require('express')
const router = express.Router()

const { getCategoryById, createCategory, getCategory, getAllCategories, updateCategory, removeCategory } = require('../controllers/category')
const { isSignedIn, isAuthenticated, isAdmin} = require('../controllers/auth')
const { getUserById } = require('../controllers/user')


// params
router.param("userId", getUserById)
router.param("categoryId", getCategoryById)

// actual routes 
router.post('/category/create/:userId', isSignedIn, isAuthenticated, isAdmin, createCategory)
router.get('/category/:categoryId', getCategory)
router.put('/category/:categoryId/:userId', isSignedIn, isAuthenticated, isAdmin, updateCategory)
router.delete('/category/:categoryId/:userId', isSignedIn, isAuthenticated, isAdmin, removeCategory)
router.get('/categories', getAllCategories)


module.exports = router