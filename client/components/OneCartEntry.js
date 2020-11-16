import React from 'react'

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
    let cart = this.props.cart
    this.setState({
      quantity: cart.quantity,
      id: cart.id
    })
  }

  handleChange(evt) {
    this.setState({[evt.target.id]: evt.target.value})
    this.setState({id: evt.target.name})
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    this.props.changeQuantity(this.state.quantity, this.state.id)
    this.setState({quantity: 0})
    this.setState({id: ''})
  }

  async handleDelete(event) {
    event.preventDefault()
    await this.props.removeItem(this.props.id)
    await this.props.getCart()
  }

  render() {
    let cartEntry = this.props.cartEntry
    let product = this.props.cartEntry.products[0] || {}
    let id = this.props.cartEntry.id
    return (
      <div key={cartEntry.id}>
        {/* <img src={product.imgUrl || ''} /> */}
        <div>
          <div>{product.name}</div>
          <div>Quantity: {cartEntry.numberOfItems}</div>
          <div>Price per Item: {product.price}</div>
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="quantity">Change Quantity:</label>
            <input
              type="number"
              id="quantity"
              name={id}
              min="0"
              max={product.quantity}
              onChange={this.handleChange}
            />
            <button className="changeQuantityButton">Submit Change</button>
          </form>
        </div>
        <button onClick={() => this.props.removeItem(id)}>Remove Item</button>
      </div>
    )
  }
}

export default OneCartEntry
