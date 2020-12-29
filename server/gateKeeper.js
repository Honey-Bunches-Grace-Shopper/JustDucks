const {Order} = require('./db/models')

const adminsOnly = (req, res, next) => {
  const currentUser = req.user
  if (!currentUser || !currentUser.admin) {
    const err = new Error('Quack, access not available!')
    err.status = 401
    return next(err)
  }
  next()
}

const checkUserIdentity = async (req, res, next) => {
  if (!req.user || Number(req.params.userId) !== req.user.id) {
    const err = new Error(`Sorry! No checking out other shopper's carts!`)
    err.status = 401
    return next(err)
  }
  next()
}

const checkCartAccess = async (req, res, next) => {
  if (!req.user || req.body.userId !== req.user.id) {
    const err = new Error(`Sorry! No Adding To Other User's Carts!`)
    err.status = 401
    return next(err)
  }
  next()
}

const checkCartOwnership = async (req, res, next) => {
  let order = await Order.findByPk(req.params.orderId)
  if (!req.user || !order || req.user.id !== order.userId) {
    const err = new Error(
      `Sorry! Accessing / Editing Other Shopper's Carts Is Not Allowed`
    )
    err.status = 401
    return next(err)
  }
  next()
}

module.exports = {
  adminsOnly,
  checkCartOwnership,
  checkCartAccess,
  checkUserIdentity
}
