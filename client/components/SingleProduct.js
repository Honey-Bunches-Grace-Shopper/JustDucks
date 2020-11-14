import React from 'react'
import {Link} from 'react-router-dom'
//import {connect} from 'react-redux'

const defaultState = {
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

  // componentDidMount() {
  //   this.setState({
  //     id: this.props.product.id,
  //   })
  // }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  async handleSubmit(event) {
    console.log('this.props.id', this.props)
    event.preventDefault()
    await this.props.updateProduct(this.props.id, this.state.quantity)
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
            <label htmlFor="changeStock">Select New Stock Level</label>
            <input
              type="number"
              name="quantity"
              min="0"
              value={this.state.quantity}
              onChange={this.handleChange}
            />
            <button>Confirm</button>
          </form>
          <button onClick={this.handleDelete}>Delete Duck</button>
        </div>
      </div>
    )

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
      </li>
    )
  }
}

export default SingleProduct
