import React from 'react'
import {connect} from 'react-redux'
import product from '../store/product'
import {fetchSelectedProduct} from '../store/singleProduct'
import {addCartProduct} from '../store/cart'

class Product extends React.Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      quantity: 0
    }
  }

  componentDidMount() {
    this.props.getSelectedProduct(this.props.match.params.productId)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    console.log(evt.target)
    this.props.addCartProduct(this.props.selectedProduct, this.state.quantity)
    this.setState({quantity: 0})
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
    console.log(this.state)
  }

  render() {
    let {selectedProduct} = this.props || {}
    const {name, price, description, imageUrl, helpfulness} = selectedProduct
    return (
      <div id="singleProduct">
        <img src={imageUrl} />
        <div>
          <h3>{name}</h3>
          <p>{description}</p>
          <p>Helpfulness: {helpfulness}</p>
          <p>Price: ${price}</p>
        </div>
        <div className="quantity selector">
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="numberOfItems">Select Duck Quantity</label>
            <input
              type="number"
              id="numberOfItems"
              name="quantity"
              min="0"
              max={selectedProduct.quantity}
              value={this.state.quantity}
              onChange={this.handleChange}
            />
            <button className="addToCartButton">Add to Nest</button>
          </form>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  selectedProduct: state.selectedProduct
})

const mapDispatch = dispatch => ({
  getSelectedProduct: productId => dispatch(fetchSelectedProduct(productId)),
  addCartProduct: (product, numberOfItems) =>
    dispatch(addCartProduct(product, numberOfItems))
})

const SelectedProduct = connect(mapState, mapDispatch)(Product)

export default SelectedProduct
