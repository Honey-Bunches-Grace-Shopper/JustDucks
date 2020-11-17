import React from 'react'
import {connect} from 'react-redux'
import {setGuestCart} from '../store/guestCart'

const defaultState = {
  cartQuantity: 0
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
    let newQuant = Number(this.state.cartQuantity)
    existing.cartQuantity = newQuant
    this.setState({cartQuantity: newQuant})
    localStorage.setItem(`${this.props.product.name}`, JSON.stringify(existing))
    this.props.setGuestCart()
  }

  async handleDelete(event) {
    event.preventDefault()
    await localStorage.removeItem(`${this.props.product.name}`)
    this.props.setGuestCart()
  }

  render() {
    let item = this.props.product
    console.log(item)
    let itemCount = this.props.product.cartQuantity
    return (
      <div>
        <img width="100px" src={item.imageUrl || ''} />
        <div>
          <div>{item.name}</div>
          <div>Price per Item: ${item.price}</div>
          <div>Current Quantity: {itemCount}</div>
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="cartQuantity">Change Quantity:</label>
            <input
              type="number"
              name="cartQuantity"
              min="0"
              max={item.quantity}
              value={this.state.cartQuantity}
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
  setGuestCart: () => dispatch(setGuestCart())
})

export default connect(null, mapDispatch)(GuestCartEntry)
