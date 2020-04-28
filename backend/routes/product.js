const express = require('express')
const router = express.Router()

const { getUserById } = require('../controllers/user')
const { isSignedIn, isAuthenticated, isAdmin} = require('../controllers/auth')
const { getProductById, createProduct, getProduct, photo, deleteProduct, updateProduct, getAllProducts, getAllUniqueCategories } = require('../controllers/product')

router.param('userId', getUserById)
router.param('productId', getProductById)

//create route
router.post('/product/create/:userId', isSignedIn, isAuthenticated, isAdmin, createProduct )

// read routes
router.get('/product/:productId', getProduct)
router.get('/product/photo/:productId', photo)

// delete routes
router.delete('/product/:productId/:userId', isSignedIn,isAuthenticated, isAdmin, deleteProduct)

// update routes
router.put('/product/:productId/:userId', isSignedIn,isAuthenticated, isAdmin, updateProduct)

// listing routes
router.get('/products', getAllProducts)

router.get('products/categories', getAllUniqueCategories)

module.exports = router
