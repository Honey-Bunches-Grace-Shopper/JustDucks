const router = require('express').Router()
const Sequelize = require('sequelize')
const {Order, Product, PastOrder} = require('../db/models')
const {checkCartOwnership} = require('../gateKeeper')
module.exports = router

// GET /api/cart/user/userId
router.get('/user/:userId', async (req, res, next) => {
  try {
    let userId = req.params.userId
    console.log('userId', userId)
    if (!userId) {
      console.log('no userid')
      throw new Error()
    }
    const orders = await Order.findAll({
      where: {
        submitted: null,
        userId: userId
      },
      include: Product
    })
    res.json(orders)
  } catch (err) {
    console.error(error)
    next(err)
  }
})

// GET /api/cart/user
router.get('/user', async (req, res, next) => {
  res.sendStatus(404)
})

// POST /api/cart
//For adding to the cart
router.post('/', async (req, res, next) => {
  try {
    let quant = Number(req.body.numberOfItems)
    const productId = req.body.selectedProduct.id

    let existingUserOrders = await Order.findAll({
      attributes: ['id'],
      where: {
        userId: req.user.id,
        submitted: null
      }
    })

    existingUserOrders = existingUserOrders.map(o => o.id)

    let existing = await PastOrder.findAll({
      where: {
        orderId: {
          [Sequelize.Op.in]: existingUserOrders
        },
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
      const newOrder = await Order.create({...req.body, userId: req.user.id})
      const product = req.body.selectedProduct
      console.log(newOrder)
      await newOrder.addProduct(product.id)
      res.json(newOrder)
    }
  } catch (err) {
    next(err)
  }
})

// GET /api/cart/:orderid
router.get('/:orderId', checkCartOwnership, async (req, res, next) => {
  try {
    const {orderId} = req.params
    const order = await Order.findByPk(orderId)
    res.json(order)
  } catch (err) {
    next(err)
  }
})

// PATCH /api/cart/:orderid
router.patch('/:orderId', checkCartOwnership, async (req, res, next) => {
  try {
    const {orderId} = req.params
    let order = await Order.findByPk(orderId)
    await order.update({numberOfItems: req.body.quantity})
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.delete('/:orderId', checkCartOwnership, async (req, res, next) => {
  try {
    const {orderId} = req.params
    const cart = await Order.findByPk(orderId)
    await cart.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
