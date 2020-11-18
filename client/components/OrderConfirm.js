import React from 'react'

const OrderConfirm = props => {
  console.log('purchase page', props)
  return (
    <div className="orderConfirm">
      <h2>Quack! Thanks a lot for the purchase!</h2>
      <img src="business_order_confirm.png" />
    </div>
  )
}

export default OrderConfirm
