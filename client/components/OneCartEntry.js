import React from 'react'
import {fetchCart, changeQuantity, removeItem} from '../store/cart'
import {connect} from 'react-redux'

const defaultState = {
  quantity: 0,
  id: ''
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
      quantity: this.props.cartEntry.numberOfItems,
      id: this.props.cartEntry.id
    })
  }

  handleChange(evt) {
    this.setState({[evt.target.id]: evt.target.value})
    // this.setState({id: evt.target.name})
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    this.props.changeQuantity(this.state.quantity, this.state.id)
    this.setState(defaultState)
  }

  async handleDelete(event) {
    event.preventDefault()
    await this.props.removeItem(this.props.id)
    await this.props.getCart()
  }

  render() {
    let product = this.props.cartEntry.products[0] || {}
    let itemCount = this.props.cartEntry.numberOfItems
    console.log(this.props.cartEntry)
    let id = this.props.cartEntry.id
    return (
      <div>
        <img width="100px" src={product.imageUrl || ''} />
        <div>
          <div>{product.name}</div>
          {/* <div>Quantity: {cartEntry.numberOfItems}</div> */}
          <div>Price per Item: ${product.price}</div>
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="quantity">Change Quantity:</label>
            <input
              type="number"
              name="quantity"
              min="0"
              max={product.quantity}
              value={this.state.quantity}
              onChange={this.handleChange}
            />
            <button>Submit Change</button>
          </form>
        </div>
        <button onClick={() => this.props.removeItem(id)}>Remove Item</button>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  getCart: () => dispatch(fetchCart()),
  removeItem: orderId => dispatch(removeItem(orderId)),
  changeQuantity: (quantity, id) => dispatch(changeQuantity(quantity, id))
})

export default connect(null, mapDispatch)(OneCartEntry)
