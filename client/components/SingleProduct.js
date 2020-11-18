import React from 'react'
import {Link} from 'react-router-dom'
import ProductForm from './Product-Form'
import {addCartProduct} from '../store/cart'
import {connect} from 'react-redux'

const defaultState = {
  name: '',
  price: '',
  description: '',
  helpfulness: '',
  quantity: 0,
  imageUrl: ''
}

export class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.addToCartButton = this.addToCartButton.bind(this)
  }

  componentDidMount() {
    let product = this.props.product
    this.setState({
      name: product.name,
      price: product.price,
      description: product.description,
      helpfulness: product.helpfulness,
      quantity: product.quantity,
      imageUrl: product.imageUrl
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
    event.preventDefault()
    await this.props.deleteProduct(this.props.id)
    await this.props.getProducts()
  }

  async addToCartButton(evt) {
    evt.preventDefault()
    let loggedIn = this.props.userId
    let current = this.props.product
    if (loggedIn) {
      this.props.addCartProduct(this.props.product, 1, this.props.userId)
    } else if (!localStorage.getItem(`${current.name}`)) {
      localStorage.setItem(
        `${current.name}`,
        JSON.stringify({
          cartQuantity: 1,
          name: current.name,
          price: current.price,
          description: current.description,
          helpfulness: current.helpfulness,
          quantity: current.quantity,
          imageUrl: current.imageUrl
        })
      )
    } else {
      let existing = JSON.parse(localStorage.getItem(`${this.state.name}`))
      let oldQuant = Number(existing.cartQuantity) || 0
      let newQuant = Number(oldQuant) + 1
      existing.cartQuantity = newQuant
      this.setState({cartQuantity: newQuant})
      localStorage.setItem(`${current.name}`, JSON.stringify(existing))
    }
  }

  render() {
    let {product} = this.props
    let {id, name, price, helpfulness, description, quantity} = product

    //Below buttons should only be visible to admins
    let adminControls = (
      <div className="adminControls">
        <h3>ADMIN STOCK CONTROLS:</h3>
        <h4>Current Stock Level: {quantity}</h4>
        <ProductForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          state={this.state}
        />
        <button type="button" id="deleteDuck" onClick={this.handleDelete}>
          Delete Duck
        </button>
      </div>
    )
    let userButton = <button onClick={this.addToCartButton}>Add To Nest</button>

    return (
      <li id="singleProduct">
        <div className="productInfo">
          <Link to={`/products/${id}`}>
            <h2>{name}</h2>
          </Link>
          <img width="100px" className="productImage" src={product.imageUrl} />
          <h3>${price}</h3>
          <h3>Helpfulness: {helpfulness}</h3>
          <h3>{description}</h3>
        </div>
        {this.props.isAdmin && adminControls}
        {!this.props.isAdmin && userButton}
      </li>
    )
  }
}

const mapDispatch = dispatch => ({
  addCartProduct: (product, numberOfItems, userId) =>
    dispatch(addCartProduct(product, numberOfItems, userId))
})

const connectedSingleProduct = connect(null, mapDispatch)(SingleProduct)

export default connectedSingleProduct
