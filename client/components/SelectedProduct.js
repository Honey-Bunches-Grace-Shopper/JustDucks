import React from 'react'
import {connect} from 'react-redux'
import SingleProduct from './SingleProduct'
import {fetchProducts} from '../store/product'

export class SelectedProduct extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let selectedProduct = this.props.selectedProduct || {}
    return (
      <div>
        <img src={selectedProduct.imgUrl} />
        <div>
          <h3>{selectedProduct.name}</h3>
          <p>{selectedProduct.description}</p>
          <p>Helpfulness: {selectedProduct.helpfulness}</p>
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
            <button>Add to Nest</button>
          </form>
        </div>
      </div>
    )
  }
}
