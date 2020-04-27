const Product = require('../models/product')
const formidable = require('formidable')
const _ = require('lodash')

const fs = require('fs')

exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
    .populate('category')
    .exec((error, product) => {
        if(error) {
            return res.status(400).json({
                error: "No product found"
            })
        }
        req.product = product
        next();
    })
}

exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm()

    form.keepExtensions = true
    form.parse(req, (error, fields, file) => {
        if(error){
            return res.status(400).json({
                error: "Problem with image" 
            })
        }

        const { name, description, price, category, stock } = fields

        if(
            !name ||
            !description ||
            !price ||
            !category ||
            !stock
        ){
            return res.status(400).json({
                error: "please include all fields"
            })
        }

        let product = new Product(fields)

        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error: "file size to big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }
        product.save((error, product) => {
            if(error){
                return res.status(404).json({
                    error: "saving product in db failed"
                })
            }
            res.json(product)
        })
    })
}

exports.getProduct = (req, res) => {
    req.product.photo = undefined
    return res.json(req.product)
}

// middleware
exports.photo = (req, res, next) => {
    if(req.product.photo.data){
        res.set("Content-Type", req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next()
}


// delete controller

exports.deleteProduct = (req, res) => {
    let product = req.product
    product.remove((error, deletedProduct) => {
        return res.status(400).json({
            error: "Failed to delete product"
        })
    })
    res.json({
        message: "Delete was a success",
        deletedProduct
    })
}

// update controller

exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true

    form.parse(req, (error, fields, file) => {
        if(error){
            return res.status(400).json({
                error: "Problem with image" 
            })
        }

        const { name, description, price, category, stock } = fields

        if(
            !name ||
            !description ||
            !price ||
            !category ||
            !stock
        ){
            return res.status(400).json({
                error: "please include all fields"
            })
        }

        // updation code
        let product = req.product
        product = _.extend(product, fields)

        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error: "file size to big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }
        product.save((error, product) => {
            if(error){
                return res.status(404).json({
                    error: "Updation is failed"
                })
            }
            res.json(product)
        })
    })
}