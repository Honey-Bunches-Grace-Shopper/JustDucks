const {Order} = require('./db/models')

const adminsOnly = (req, res, next) => {
  const currentUser = req.user
  if (currentUser && !currentUser.admin) {
    const err = new Error('Quack, access not available!')
    err.status = 401
    return next(err)
  }
  next()
}

const checkCartOwnership = async (req, res, next) => {
  const {orderId} = req.params

  const currentUser = req.user
  const userId = currentUser.id

  let order = await Order.findByPk(orderId)

  if (order.userId != userId) {
    const err = new Error("QUACK!! Don't go snooping on other people's carts!")
    err.status = 401
    return next(err)
  }

  next()
}

module.exports = {
  adminsOnly,
  checkCartOwnership
}
