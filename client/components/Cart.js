import React from 'react'
import {connect} from 'react-redux'
import {fetchCart, changeQuantity, removeItem} from '../store/cart'
import OneCartEntry from './OneCartEntry'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 0,
      id: ''
    }
  }

  componentDidMount() {
    this.props.getCart()
  }

  render() {
    const cart = localStorage.getItem(cart) || this.props.cart || []
    return (
      <div>
        <h1>Cart:</h1>
        <div className="cart-items">
          {cart.map(cartEntry => (
            <OneCartEntry
              cart={this.state}
              removeItem={this.props.removeItem}
              cartEntry={cartEntry}
              id={cartEntry.id}
              changeQuantity={this.props.changeQuantity}
            />
          ))}
        </div>
        <div className="cart-total">
          <h4>Total</h4>
          <div>Price:</div>
        </div>
        <div className="checkout">
          <div>Log In Above or Checkout as Guest:</div>
          <div className="shipping">
            <h4>SHIPPING INFORMATION</h4>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="firstName">First Name:</label>
              <input type="text" id="firstName" name="lastName" />
              <label htmlFor="lastName">Last Name:</label>
              <input type="text" id="lastName" name="lastName" />
              <label htmlFor="streetAddress">Street Address:</label>
              <input type="text" id="streetAddress" name="streetAddress" />
              <label htmlFor="city">City</label>
              <input type="text" id="city" name="city" />
              <label htmlFor="zipCode">ZIP Code:</label>
              <input type="number" id="zipCode" name="zipCode" />
            </form>
          </div>
          <div>
            <h4>INPUT CREDIT CARD</h4>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" />
              <label htmlFor="ccNumber">Credit Card Number:</label>
              <input type="password" id="ccNumber" name="ccNumber" />
              <label htmlFor="ssid">SSID</label>
              <input type="password" id="ssid" name="ssid" />
              <label htmlFor="cardType">Card Type:</label>
              <select name="cardType" id="cardType">
                <option value="Discover">Discover</option>
                <option value="Visa">Visa</option>
              </select>
              <label htmlFor="billingZip">Billing ZIP:</label>
              <input type="number" id="billingZip" name="billingZip" />
              <label htmlFor="experation">Experation Date:</label>
              <input type="month" id="experation" name="experation" />
              <button type="submit">Submit Order</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  getCart: () => dispatch(fetchCart()),
  removeItem: orderId => dispatch(removeItem(orderId)),
  changeQuantity: (quantity, id) => dispatch(changeQuantity(quantity, id))
})

const mapState = state => ({
  cart: state.cart
})

export default connect(mapState, mapDispatch)(Cart)
