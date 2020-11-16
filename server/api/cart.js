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
    let quant = Number(req.body.numberOfItems)
    const productId = req.body.selectedProduct.id
    //CHECK TO SEE IF THIS ITEM IS IN THE CART
    let existing = await PastOrder.findAll({
      where: {
        productId: productId
      }
    })
    //IF IT'S IN THE CART, INCREASE QUANTITY USING REQ.BODY
    console.log(existing)
    if (existing.length > 0) {
      let orderId = existing[0].dataValues.orderId
      let oldOrder = await Order.findByPk(orderId)
      let oldOrderQuant = Number(oldOrder.numberOfItems)
      let newQuant = oldOrderQuant + quant
      let updatedOrder = await oldOrder.update({
        numberOfItems: `${newQuant}`
      })
      console.log(updatedOrder)
      res.json(updatedOrder)
      //IF IT'S NOT IN THE CART YET, CREATE IT
    } else {
      const newOrder = await Order.create(req.body)
      const product = req.body.selectedProduct
      await newOrder.addProduct(product.id)
      console.log(newOrder)
      res.json(newOrder)
    }
  } catch (err) {
    next(err)
  }
})

//KATELYNN'S OLD ROUTE INCASE WE NEED IT BACK!
// router.post('/', async (req, res, next) => {
//   try {
//     const newOrder = await Order.create(req.body)
//     const product = req.body.selectedProduct
//     await newOrder.addProduct(product.id)
//     res.json(newOrder)
//   } catch (err) {
//     next(err)
//   }
// })

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
    let order = await Order.findByPk(orderId)
    console.log('ORDER BEFORE UPDATE --->', order)
    console.log('REQ.BODY.QUANTITY --->', req.body.quantity)
    await order.update({numberOfItems: req.body.quantity})
    console.log('ORDER AFTER UPDATE --->', order)
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.delete('/:orderId', async (req, res, next) => {
  try {
    const {orderId} = req.params
    const cart = await Order.findByPk(orderId)
    console.log(cart)
    await cart.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
