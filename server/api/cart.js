const router = require('express').Router()
const {Order, Product, PastOrder} = require('../db/models')
module.exports = router

// GET /api/cart/user/userId
router.get('/user/:userId', async (req, res, next) => {
  try {
    let userId = req.params.userId
    const orders = await Order.findAll({
      where: {
        submitted: null,
        userId: userId
      },
      include: Product
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

// POST /api/cart
router.post('/', async (req, res, next) => {
  try {
    let quant = Number(req.body.numberOfItems)
    const productId = req.body.selectedProduct.id
    let existing = await PastOrder.findAll({
      where: {
        productId: productId
      }
    })
    if (existing.length > 0) {
      let orderId = existing[0].dataValues.orderId
      let oldOrder = await Order.findByPk(orderId)
      let oldOrderQuant = Number(oldOrder.numberOfItems)
      let newQuant = oldOrderQuant + quant
      let updatedOrder = await oldOrder.update({
        numberOfItems: `${newQuant}`
      })
      res.json(updatedOrder)
    } else {
      const newOrder = await Order.create(req.body)
      const product = req.body.selectedProduct
      await newOrder.addProduct(product.id)
      res.json(newOrder)
    }
  } catch (err) {
    next(err)
  }
})

// GET /api/cart/orderid
router.get('/:orderId', async (req, res, next) => {
  try {
    const {orderId} = req.params
    const order = await Order.findByPk(orderId)
    res.json(order)
  } catch (err) {
    next(err)
  }
})

// PATCH /api/cart/orderid
router.patch('/:orderId', async (req, res, next) => {
  try {
    const {orderId} = req.params
    let order = await Order.findByPk(orderId)
    await order.update({numberOfItems: req.body.quantity})
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.delete('/:orderId', async (req, res, next) => {
  try {
    const {orderId} = req.params
    const cart = await Order.findByPk(orderId)
    await cart.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
