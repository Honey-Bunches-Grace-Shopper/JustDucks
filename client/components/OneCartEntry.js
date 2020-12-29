import React from 'react'
import {fetchCart, changeQuantity, removeItem} from '../store/cart'
import {connect} from 'react-redux'

const defaultState = {
  numberOfItems: 0,
  orderId: ''
}

class OneCartEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    this.setState({
      numberOfItems: this.props.cartEntry.numberOfItems,
      orderId: this.props.cartEntry.id
    })
    this.props.getCart(this.props.user.id)
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleSubmit(evt) {
    evt.preventDefault()
    // console.log(this.props.user.id)
    this.props.changeQuantity(this.state.numberOfItems, this.state.orderId)
    this.props.getCart(this.props.user.id)
  }

  async handleDelete(event) {
    event.preventDefault()
    await this.props.removeItem(this.state.orderId)
    await this.props.getCart(this.props.user.id)
  }

  render() {
    // console.log('this.props in onecartentry', this.props)
    let item = this.props.cartEntry.products || {}
    let product = item[0] || {}
    let itemCount = this.props.cartEntry.numberOfItems
    return (
      <div className="cart-item">
        <div className="cart-item-info">
          <img width="100px" src={product.imageUrl || ''} />
          <div className="productName">{product.name}</div>
          <div>Price per Item: ${product.price}</div>
          <div>Current Quantity: {itemCount}</div>
        </div>
        <div className="cart-item-edit">
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="quantity">Change Quantity:</label>
            <input
              type="number"
              name="numberOfItems"
              min="1"
              max={product.quantity}
              value={this.state.numberOfItems}
              onChange={this.handleChange}
            />
            <button>Submit Change</button>
          </form>
          <button className="remove-item" onClick={this.handleDelete}>
            Remove Item
          </button>
        </div>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  getCart: userId => dispatch(fetchCart(userId)),
  removeItem: orderId => dispatch(removeItem(orderId)),
  changeQuantity: (quantity, id) => dispatch(changeQuantity(quantity, id))
})

const mapState = state => ({
  user: state.user
})

export default connect(mapState, mapDispatch)(OneCartEntry)
