const router = require('express').Router()
const {Order, Product, PastOrder} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: Product
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body)
    res.json(newOrder)
  } catch (err) {
    next(err)
  }
})

router.delete('/', async (req, res, next) => {})
