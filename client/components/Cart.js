import React from 'react'
import {connect} from 'react-redux'
import {fetchCart, changeQuantity, removeItem, submitCart} from '../store/cart'
import OneCartEntry from './OneCartEntry'


const defaultState = {
  firstName: '',
  lastName: '',
  streetAddress: '',
  city: '',
  zipCode: '',
  name: '',
  ccNumber: '',
  ssid: '',
  cardType: '',
  billingZip: '',
  experation: ''
}

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.handleChange = this.handleSubmit.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getCart()
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    // this.props.submitCart()
    this.setState(defaultState)
    //submitting cart must also turn the orders in the cart to "submitted"
  }

  render() {
    const cart = this.props.cart || []
    return (
      <div>
        <h1>Cart:</h1>
        <div className="cart-items">
          {cart.map(cartEntry => (
            <OneCartEntry cartEntry={cartEntry} key={cartEntry.id} />
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
              <div>
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  name="lastName"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                />
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />
                <label htmlFor="streetAddress">Street Address:</label>
                <input
                  type="text"
                  id="streetAddress"
                  name="streetAddress"
                  value={this.state.streetAddress}
                  onChange={this.handleChange}
                />
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={this.state.city}
                  onChange={this.handleChange}
                />
                <label htmlFor="zipCode">ZIP Code:</label>
                <input
                  type="number"
                  id="zipCode"
                  name="zipCode"
                  value={this.state.zipCode}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <h4>INPUT CREDIT CARD</h4>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={this.handleChange}
                  value={this.state.name}
                />
                <label htmlFor="ccNumber">Credit Card Number:</label>
                <input
                  type="password"
                  id="ccNumber"
                  name="ccNumber"
                  value={this.state.ccNumber}
                  onChange={this.handleChange}
                />
                <label htmlFor="ssid">SSID</label>
                <input
                  type="password"
                  id="ssid"
                  name="ssid"
                  value={this.state.ssid}
                  onChange={this.handleChange}
                />
                <label htmlFor="cardType">Card Type:</label>
                <select
                  name="cardType"
                  id="cardType"
                  onChange={this.handleChange}
                >
                  <option value="Discover">Discover</option>
                  <option value="Visa">Visa</option>
                </select>
                <label htmlFor="billingZip">Billing ZIP:</label>
                <input
                  type="number"
                  id="billingZip"
                  name="billingZip"
                  onChange={this.handleChange}
                  value={this.state.billingZip}
                />
                <label htmlFor="experation">Experation Date:</label>
                <input
                  type="month"
                  id="experation"
                  name="experation"
                  value={this.state.experation}
                  onChange={this.handleChange}
                />
                <button type="submit">Submit Order</button>
              </div>
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
  // submitCart: () => dispatch(submitCart()),
})

const mapState = state => ({
  cart: state.cart
})

const Cart = connect(mapState, mapDispatch)(DisconnectedCart)

export default Cart
