import React from 'react'
import {connect} from 'react-redux'
import SingleProduct from './SingleProduct'
import {fetchProducts} from '../store/product'
import {updateOneProduct} from '../store/product'

class Products extends React.Component {
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
            <SingleProduct
              product={product}
              key={product.id}
              isAdmin={this.props.isAdmin}
              updateProduct={this.props.updateProduct}
            />
          ))}
        </ol>
      </div>
    )
  }
}

const mapState = state => ({
  products: state.products,
  isAdmin: state.user.admin
})

const mapDispatch = dispatch => ({
  getProducts: () => dispatch(fetchProducts()),
  updateProduct: (id, stock) => updateOneProduct(id, stock)
})

const AllProducts = connect(mapState, mapDispatch)(Products)
export default AllProducts
