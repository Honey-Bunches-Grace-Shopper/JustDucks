import React from 'react'
import {connect} from 'react-redux'
import {fetchCart, changeQuantity, removeItem} from '../store/cart'
import OneCartEntry from './OneCartEntry'
import {me} from '../store/user'
import {setGuestCart} from '../store/guestCart'
import GuestCartEntry from './GuestCartEntry'
import {fetchProducts, updateSubmittedProducts} from '../store/product'

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
  experation: '',
  userCartTotal: ''
}

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.handleChange = this.handleChange.bind(this)
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

  async handleSubmit(evt) {
    evt.preventDefault()
    let productArr = []
    let stockArr = []
    let residueArr = []
    let submitInfo = {}
    const currentCart = this.props.user.email
      ? this.props.cart
      : this.props.guestCart
    productArr = currentCart.map(cartEntry => {
      return cartEntry.numberOfItems
    })
    stockArr = currentCart.map(cartEntry => {
      return cartEntry.products[0].quantity
    })
    // console.log('new Arrays after submission-->', productArr, stockArr)
    for (let i = 0; i < productArr.length; i++) {
      const residue = stockArr[i] - productArr[i]
      residueArr.push(residue)
    }
    // console.log('residueArr', residueArr)
    for (let i = 0; i < productArr.length; i++) {
      let productId = productArr[i]
      let quantity = residueArr[i]
      submitInfo[`${productId}`] = quantity
    }
    // console.log('submitInfo', submitInfo)
    await this.props.updateStock(submitInfo)
    await this.props.getProducts()
    this.setState(defaultState)
    this.props.history.push('/purchased')
  }

  updateUserCartTotal(userCart) {
    let sum = 0
    userCart.map(item => {
      let quant = item.numberOfItems
      let productArr = item.products || {}
      let instance = productArr[0] || 0
      let price = Number(instance.price || 0)
      let total = quant * price
      sum += total
    })
    return sum
  }

  updateGuestCartTotal(guestCart) {
    let sum = 0
    guestCart.map(item => {
      let quant = Number(item.cartQuantity || 0)
      let price = Number(item.price || 0)
      let total = quant * price
      sum += total
    })
    return sum
  }

  render() {
    const userCart = this.props.cart || []
    const guestyCart = this.props.guestCart || []
    let guestCartTotal = this.updateGuestCartTotal(guestyCart) || 0
    let userCartTotal = this.updateUserCartTotal(userCart) || 0
    let loggedInCart = (
      <div>
        <div className="cart-items">
          {userCart.map(cartEntry => (
            <OneCartEntry cartEntry={cartEntry} key={cartEntry.id} />
          ))}
        </div>
        <div className="cart-total">
          <h4>Total Price: ${userCartTotal}</h4>
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
          <h4>Total Price: ${guestCartTotal} </h4>
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
  getProducts: () => dispatch(fetchProducts()),
  removeItem: orderId => dispatch(removeItem(orderId)),
  changeQuantity: (quantity, id) => dispatch(changeQuantity(quantity, id)),
  setGuestCart: () => dispatch(setGuestCart()),
  updateStock: submitInfo => dispatch(updateSubmittedProducts(submitInfo))
})

const mapState = state => ({
  cart: state.cart,
  guestCart: state.guestCart,
  user: state.user,
  products: state.products
})

export default connect(mapState, mapDispatch)(Cart)
