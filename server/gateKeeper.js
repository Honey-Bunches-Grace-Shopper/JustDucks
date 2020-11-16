const adminsOnly = (req, res, next) => {
  const currentUser = req.user
  if (currentUser && !currentUser.admin) {
    const err = new Error('Quack, access not available!')
    err.status = 401
    return next(err)
  }
  next()
}

module.exports = adminsOnly
