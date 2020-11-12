import React from 'react'
import {connect} from 'react-redux'
import {fetchSelectedProduct} from '../store/singleProduct'

class Product extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getSelectedProduct(this.props.match.params.productId)
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
            <label htmlFor="quantity">Select Duck Quantity</label>
            <select id="quantity" name="quantity">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
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
  getSelectedProduct: productId => dispatch(fetchSelectedProduct(productId))
})

const SelectedProduct = connect(mapState, mapDispatch)(Product)

export default SelectedProduct
