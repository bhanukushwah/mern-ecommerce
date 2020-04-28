const express = require('express')
const router = express.Router()

const { getUserById, pushOrderInPurchaseList } = require('../controllers/user')
const { isSignedIn, isAuthenticated, isAdmin} = require('../controllers/auth')
const { updateStock } = require('../controllers/product')


const {getOrderById, createOrder, getAllOrders, updateStatus, getOrderStatus} = require('../controllers/order')

// params
router.param('userId', getUserById);
router.param('orderId', getOrderById);

router.post('order/create/:userId', isSignedIn, isAuthenticated, pushOrderInPurchaseList, updateStock, createOrder)
router.get('order/all/:userId', isSignedIn, isAuthenticated, getAllOrders)

// order status
router.get('/order/status/:userId', isSignedIn, isAuthenticated, isAdmin, getOrderStatus)
router.post('/order/:orderId/status/:userId', isSignedIn, isAuthenticated, isAdmin, updateStatus)

module.exports = router