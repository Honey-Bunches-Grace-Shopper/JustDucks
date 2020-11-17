const router = require('express').Router()
const {Product} = require('../db/models')
const adminsOnly = require('../gateKeeper')
module.exports = router

//PUT     /api/stock/:productId
router.put('/:id', adminsOnly, async (req, res, next) => {
  try {
    const {id} = req.params
    const productInstance = await Product.findByPk(id)
    await productInstance.update(req.body)
    res.json(productInstance)
  } catch (err) {
    next(err)
  }
})

//DELETE    /api/stock/:productId
router.delete('/:id', adminsOnly, async (req, res, next) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.id
      }
    })
    res.send('Delete Complete')
  } catch (err) {
    next(err)
  }
})

//POST    /api/stock/
router.post('/', adminsOnly, async (req, res, next) => {
  try {
    let newProduct = await Product.create(req.body)
    res.send(newProduct)
  } catch (error) {
    next(error)
  }
})
