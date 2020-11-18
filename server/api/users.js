const router = require('express').Router()
const {User} = require('../db/models')
const {adminsOnly} = require('../gateKeeper')
module.exports = router

router.get('/', adminsOnly, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      order: [['id', 'ASC']]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', adminsOnly, async (req, res, next) => {
  try {
    const {userId} = req.params
    const user = await User.findByPk(userId)
    res.json(user)
  } catch (err) {
    next(err)
  }
})
