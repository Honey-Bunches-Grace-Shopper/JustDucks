import React from 'react'
import {connect} from 'react-redux'
import {fetchCart, changeQuantity, removeItem, submitCart} from '../store/cart'
import OneCartEntry from './OneCartEntry'
import {me} from '../store/user'
import {setGuestCart} from '../store/guestCart'
import GuestCartEntry from './GuestCartEntry'

const defaultState = {
  userId: '',
  firstName: '',
  lastName: '',
  streetAddress: '',
  city: '',
  zipCode: '',
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

  async componentDidMount() {
    await this.props.getUser()
    await this.setState({
      userId: this.props.user.id || ''
    })
    if (this.state.userId) {
      this.props.getCart(this.state.userId)
    }
    this.props.setGuestCart()
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.setState(defaultState)
  }

  render() {
    const userCart = this.props.cart || []
    const guestyCart = this.props.guestCart || []
    console.log(userCart)
    let loggedInCart = (
      <div>
        <div className="cart-items">
          {userCart.map(cartEntry => (
            <OneCartEntry cartEntry={cartEntry} key={cartEntry.id} />
          ))}
        </div>
        <div className="cart-total">
          <h4>Total</h4>
          <div>Price:</div>
        </div>
      </div>
    )

    let guestCart = (
      <div>
        <div>
          {guestyCart.map(product => (
            <GuestCartEntry product={product} key={product.name} />
          ))}
        </div>
        <div className="cart-total">
          <h4>Total</h4>
          <div>Price:</div>
        </div>
      </div>
    )

    return (
      <div>
        <h1>Cart:</h1>
        {this.props.user.email && loggedInCart}
        {!this.props.user.email && guestCart}
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
  getUser: () => dispatch(me()),
  getCart: userId => dispatch(fetchCart(userId)),
  removeItem: orderId => dispatch(removeItem(orderId)),
  changeQuantity: (quantity, id) => dispatch(changeQuantity(quantity, id)),
  setGuestCart: () => dispatch(setGuestCart())
})

const mapState = state => ({
  cart: state.cart,
  guestCart: state.guestCart,
  user: state.user
})

export default connect(mapState, mapDispatch)(Cart)
