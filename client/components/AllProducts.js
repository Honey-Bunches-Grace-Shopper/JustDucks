import React from 'react'
import {connect} from 'react-redux'
import SingleProduct from './SingleProduct'
import {
  fetchProducts,
  updateOneProduct,
  deleteOneProduct
} from '../store/product'

class Products extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    const isAdmin = this.props.isAdmin || ''
    console.log(isAdmin)
    const {products} = this.props || {}
    return (
      <div>
        <h2>All Products:</h2>
        <ol className="allProducts">
          {products.map(product => (
            <SingleProduct
              product={product}
              key={product.id}
              id={product.id}
              isAdmin={isAdmin}
              updateProduct={this.props.updateProduct}
              deleteProduct={this.props.deleteProduct}
              getProducts={this.props.getProducts}
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
  updateProduct: (id, stock) => updateOneProduct(id, stock),
  deleteProduct: id => deleteOneProduct(id)
})

const AllProducts = connect(mapState, mapDispatch)(Products)
export default AllProducts
