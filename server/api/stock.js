const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

//PUT     /api/stock/:productId

router.put('/:id', async (req, res, next) => {
  try {
    console.log(req.body)
    const {id} = req.params
    const productInstance = await Product.findByPk(id)
    await productInstance.update(req.body)
    res.json(productInstance)
  } catch (err) {
    next(err)
  }
})

//DELETE    /api/stock/:productId
router.delete('/:id', async (req, res, next) => {
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
