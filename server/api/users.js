const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

const adminsOnly = (req, res, next) => {
  if (req.user.id && !req.user.admin) {
    const err = new Error('Not an admin. Not allowed')
    err.status = 401
    return next(err)
  }
  next()
}

const userOnly = (req, res, next) => {
  const {userId} = req.params
  console.log('req.user.id', req.user.id)
  console.log('userId', Number(userId))
  if (!req.user.id || req.user.id !== Number(userId)) {
    const err = new Error('Not the current user. Not allowed')
    err.status = 401
    return next(err)
  }
  next()
}

router.get('/', adminsOnly, async (req, res, next) => {
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

router.get('/:userId', userOnly, async (req, res, next) => {
  try {
    const {userId} = req.params
    const user = await User.findByPk(userId)
    res.json(user)
  } catch (err) {
    next(err)
  }
})
