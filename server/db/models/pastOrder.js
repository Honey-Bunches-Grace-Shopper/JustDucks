const Sequelize = require('sequelize')
const db = require('../db')

const PastOrder = db.define('pastOrder', {
  numberOfItems: {
    type: Sequelize.INTEGER
  },

  unitPrice: {
    type: Sequelize.DECIMAL(10, 2)
  }
})

module.exports = PastOrder
