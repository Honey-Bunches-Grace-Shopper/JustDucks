import React from 'react'
import {connect} from 'react-redux'
import {setGuestCart} from '../store/guestCart'

const defaultState = {
  cartQuantity: 0
  // orderId: ''
}

class GuestCartEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    this.setState({
      cartQuantity: this.props.product.cartQuantity
      // orderId: this.props.cartEntry.id
    })
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    let existing = JSON.parse(
      localStorage.getItem(`${this.props.product.name}`)
    )
    let oldQuant = Number(existing.cartQuantity) || 0
    let newQuant = Number(oldQuant) + Number(this.state.cartQuantity)
    existing.cartQuantity = newQuant
    this.setState({cartQuantity: newQuant})
    localStorage.setItem(`${this.state.name}`, JSON.stringify(existing))
    this.props.getGuestCart()
  }

  async handleDelete(event) {
    event.preventDefault()
    await localStorage.removeItem(`${this.props.product.name}`)
    this.props.getGuestCart()
  }

  render() {
    let item = this.props.cartEntry.products || {}
    let product = item[0] || {}
    let itemCount = this.props.cartEntry.numberOfItems
    console.log(this.props.cartEntry)
    return (
      <div>
        <img width="100px" src={product.imageUrl || ''} />
        <div>
          <div>{product.name}</div>
          <div>Price per Item: ${product.price}</div>
          <div>Current Quantity: {itemCount}</div>
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="quantity">Change Quantity:</label>
            <input
              type="number"
              name="numberOfItems"
              min="0"
              max={product.quantity}
              value={this.state.numberOfItems}
              onChange={this.handleChange}
            />
            <button>Submit Change</button>
          </form>
        </div>
        {/* <button onClick={() => this.props.removeItem(id)}>Remove Item</button> */}
        <button onClick={this.handleDelete}>Remove Item</button>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  getGuestCart: () => dispatch(setGuestCart())
})

export default connect(null, mapDispatch)(GuestCartEntry)
