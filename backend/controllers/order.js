const { Order, ProductCart} = require('../models/order')

exports.getOrderById = (req, res, next, id) => {
    Order.findById(id)
    .populate('products.product', 'name price')
    .exec((error, order) => {
        return res.status(400).json({
            error: "No order find in db"
        })
        req.order = order
        next()
    })
}

//Actual Order

//create
exports.createOrder = (req, res) => {
    req.body.order.user = req.profile
    const order = new Order(req.body.order)
    order.save((error, order) => {
        return res.status(400).json({
            error: "Failed to save order"
        })
        res.json(order)
    })
}

//read
exports.getAllOrders = (req, res) => {
    Order.find()
    .populate('user', '_id name')
    .exec((error, order) => {
        if(error) {
            return res.status(400).json({
                error: "No order found in db"
            })
        }
        res.json(order)
    } )
}

exports.updateStatus = (req, res) => {
    Order.update({_id: req.body.order.id},
        {$set: {
            status: req.body.status
        }},
        (error, order) => {
            if(error){
                return res.status(400).json({
                    error: "Cannot update order status"
                })
            }
            res.json(order)
        })
}

exports.getOrderStatus = (req, res) => {
    res.json(Order.schema.path("status").enumValues)
}