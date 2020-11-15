import React from 'react'
import {connect} from 'react-redux'
import SingleProduct from './SingleProduct'
import {
  fetchProducts,
  updateOneProduct,
  deleteOneProduct,
  createProduct
} from '../store/product'
import ProductForm from './Product-Form'

const defaultState = {
  name: '',
  price: '',
  description: '',
  helpfulness: '',
  quantity: 0,
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
      <div>
        {isAdmin && <h3>Create New Product:</h3>}
        {isAdmin && (
          <ProductForm
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            state={this.state}
          />
        )}
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
  deleteProduct: id => deleteOneProduct(id),
  newProduct: product => createProduct(product)
})

const AllProducts = connect(mapState, mapDispatch)(Products)
export default AllProducts
