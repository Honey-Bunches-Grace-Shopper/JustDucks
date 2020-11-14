const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

//PUT     /api/stock/:productId

router.put('/:id', async (req, res, next) => {
  try {
    const {id} = req.params
    const productInstance = await Product.findByPk(id)
    await productInstance.update(req.body)
    res.json(productInstance)
  } catch (err) {
    next(err)
  }
})
