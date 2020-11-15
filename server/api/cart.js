const router = require('express').Router()
const {Order, Product, PastOrder} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        submitted: null
      },
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
    const product = req.body.selectedProduct
    await newOrder.addProduct(product.id)
    res.json(newOrder)
  } catch (err) {
    next(err)
  }
})

router.patch('/', async (req, res, next) => {
  try {
    console.log(req.body, 'body')
    await Order.update(
      {
        numberOfItems: req.body.quantity
      },
      {
        where: {
          id: req.body.id
        }
      }
    )
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

router.delete('/', async (req, res, next) => {})
