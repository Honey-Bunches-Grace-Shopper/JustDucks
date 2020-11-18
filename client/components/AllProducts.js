import React from 'react'
import {connect} from 'react-redux'
import SingleProduct from './SingleProduct'
import {
  fetchProducts,
  updateOneProduct,
  deleteOneProduct,
  createProduct
} from '../store/product'
import {addCartProduct} from '../store/cart'
import ProductForm from './Product-Form'

const defaultState = {
  name: '',
  price: '',
  description: '',
  helpfulness: '',
  quantity: 1,
  imageUrl: ''
}

class Products extends React.Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getProducts()
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    await this.props.newProduct(this.state)
    await this.props.getProducts()
  }

  render() {
    const isAdmin = this.props.isAdmin || ''
    const {products} = this.props || {}
    return (
      <div className="container">
        <div className="admin">
          {isAdmin && <h3 className="center">Create New Product:</h3>}
          {isAdmin && (
            <ProductForm
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              state={this.state}
            />
          )}
        </div>
        <div className="items">
          <h1 className="center">All Products:</h1>
          <ol className="allProducts">
            {products.map(product => (
              <SingleProduct
                product={product}
                key={product.name}
                id={product.id}
                isAdmin={isAdmin}
                updateProduct={this.props.updateProduct}
                addCartProduct={this.props.addCartProduct}
                deleteProduct={this.props.deleteProduct}
                getProducts={this.props.getProducts}
              />
            ))}
          </ol>
        </div>
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
  deleteProduct: id => deleteOneProduct(id),
  newProduct: product => createProduct(product),
  addCartProduct: (product, numberOfItems, userId) =>
    dispatch(addCartProduct(product, numberOfItems, userId))
})

const AllProducts = connect(mapState, mapDispatch)(Products)
export default AllProducts
