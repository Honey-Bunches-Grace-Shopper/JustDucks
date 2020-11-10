import React from 'react'
import {connect} from 'react-redux'
import SingleProduct from './SingleProduct'
import {fetchProducts} from '../store/product'

class AllProducts extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    const {products} = this.props || {}
    return (
      <div>
        <h2>All Products:</h2>
        <ol>
          {products.map(product => (
            <SingleProduct product={product} key={product.id} />
          ))}
        </ol>
      </div>
    )
  }
}

const mapState = state => ({
  products: state.products
})

const mapDispatch = dispatch => ({
  getProducts: () => dispatch(fetchProducts())
})

export default connect(mapState, mapDispatch)(AllProducts)
