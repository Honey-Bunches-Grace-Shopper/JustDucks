import React from 'react'
import {Link} from 'react-router-dom'

export default class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let {product} = this.props
    let {id, name, price, helpfulness, description} = product
    return (
      <li>
        <Link to={`/products/${id}`}>
          <h2>{name}</h2>
        </Link>
        <img width="100px" className="productImage" src={product.imageUrl} />
        <h3>{price}</h3>
        <h3>{helpfulness}</h3>
        <h3>{description}</h3>
        <button className="addToCartButton">Add To Nest</button>
      </li>
    )
  }
}
