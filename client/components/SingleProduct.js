import React from 'react'
import {Link} from 'react-router-dom'
//import {connect} from 'react-redux'

const defaultState = {
  name: '',
  price: '',
  description: '',
  helpfulness: '',
  quantity: 0
}

export class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    let product = this.props.product
    this.setState({
      name: product.name,
      price: product.price,
      description: product.description,
      helpfulness: product.helpfulness,
      quantity: product.quantity
    })
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    await this.props.updateProduct(this.props.id, this.state)
    await this.props.getProducts()
  }

  async handleDelete(event) {
    console.log('CLICK')
    event.preventDefault()
    await this.props.deleteProduct(this.props.id)
    await this.props.getProducts()
  }

  render() {
    let {product} = this.props
    let {id, name, price, helpfulness, description, quantity} = product

    //Below buttons should only be visible to admins
    let adminControls = (
      <div className="adminControls">
        <h4>Current Stock Level: {quantity}</h4>
        <div className="changeStock">
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="changeName">Change Name:</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <label htmlFor="changePrice">Change Price:</label>
            <input
              type="number"
              name="price"
              value={this.state.price}
              onChange={this.handleChange}
            />
            <label htmlFor="changeDescription">Change Description:</label>
            <input
              type="text"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
            <label htmlFor="changeHelpfulness">Change Helpfulness:</label>
            <input
              type="number"
              name="helpfulness"
              value={this.state.helpfulness}
              onChange={this.handleChange}
            />
            <label htmlFor="changeStock">Update Stock Level:</label>
            <input
              type="number"
              name="quantity"
              min="0"
              value={this.state.quantity}
              onChange={this.handleChange}
            />
            <button>Confirm Changes</button>
          </form>
          <button onClick={this.handleDelete}>Delete Duck</button>
        </div>
      </div>
    )
    let userButton = <button>Add To Nest</button>

    return (
      <li>
        <Link to={`/products/${id}`}>
          <h2>{name}</h2>
        </Link>
        <img width="100px" className="productImage" src={product.imageUrl} />
        <h3>${price}</h3>
        <h3>Helpfulness: {helpfulness}</h3>
        <h3>{description}</h3>
        {this.props.isAdmin && adminControls}
        {!this.props.isAdmin && userButton}
      </li>
    )
  }
}

export default SingleProduct
