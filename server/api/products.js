const router = require('express').Router()
const {Product} = require('../db/models')
// const adminOnly = require('../gateKeeper')
module.exports = router

//  GET  /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      order: [['name', 'ASC']]
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

//  GET  /api/products/:id
router.get('/:productId', async (req, res, next) => {
  try {
    const {productId} = req.params
    const product = await Product.findByPk(productId)
    res.json(product)
  } catch (err) {
    next(err)
  }
})
