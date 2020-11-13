import React from 'react'
import {Link} from 'react-router-dom'

export default class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let adminControls = (
      <div className="adminControls">
        <h3>Manage Stock</h3>
        <button>Remove Item</button>
        <button>Increase Quantity</button>
        <button>Decrease Quantity</button>
      </div>
    )
    let shopperControls = (
      <button className="addToCartButton">Add To Nest</button>
    )

    let {product} = this.props
    let {id, name, price, helpfulness, description} = product
    return (
      <li>
        <Link to={`/products/${id}`}>
          <h2>{name}</h2>
        </Link>
        <img width="100px" className="productImage" src={product.imageUrl} />
        <h3>${price}</h3>
        <h3>Helpfulness: {helpfulness}</h3>
        <h3>{description}</h3>
        {this.props.admin && adminControls}
        {this.props.admin && shopperControls}
      </li>
    )
  }
}
