const router = require('express').Router()
const {User, Order} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

//GET userInfo /api/users/:userId
router.get('/:userId', async (req, res, next) => {
  try {
    const {userId} = req.params
    const user = await User.findByPk(userId, {
      include: Order
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})

// PUT userInfo  /api/users/:userId
router.put('/:userId', async (req, res, next) => {
  try {
    const {userId} = req.params
    const userInstance = await User.findByPk(userId)
    await userInstance.update(req.body)
    res.json(userInstance)
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId', async (req, res, next) => {
  try {
    const {userId} = req.params
    await User.destroy({
      where: {
        id: userId
      }
    })
    res.send('Delete Complete')
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    let newUser = await User.create(req.body)
    res.json(newUser)
  } catch (err) {
    next(err)
  }
})
