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

router.get('/:orderId', async (req, res, next) => {
  try {
    const {orderId} = req.params
    const order = await Order.findByPk(orderId)
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.patch('/:orderId', async (req, res, next) => {
  try {
    const {orderId} = req.params
    await Order.update(
      {
        numberOfItems: req.body.quantity
      },
      {
        where: {
          id: orderId
        }
      }
    )
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

router.delete('/:orderId', async (req, res, next) => {
  try {
    const {orderId} = req.params
    const cartNumber = await Order.findByPk(orderId)
    console.log('cart', cartNumber)
    await cartNumber.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
