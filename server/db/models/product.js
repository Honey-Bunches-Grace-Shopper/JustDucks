const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name:{
    type: Sequelize.TEXT,
    allowNull: false,
    unique: true
   },
   price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
   },
   quantity: {
       type: Sequelize.INTEGER,
       allowNull: false,
       validate: {
           min: 0
       }
   },
   description: {
       type: Sequelize.TEXT,
       allowNull: true
   },

   imageUrl: {
       type: Sequelize.TEXT,
       defaultValue: "https://www.mastgeneralstore.com/prodimages/9391-DEFAULT-l.jpg"
   },
   helpfulness: {
       type: Sequelize.INTEGER,
       validate: {
           min: 0,
           max: 5
       }
   }
  })

  module.exports = Product