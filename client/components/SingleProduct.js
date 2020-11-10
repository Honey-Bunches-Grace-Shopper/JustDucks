import React from 'react'

export default class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let {product} = this.props
    return (
      <li>
        <h2>{product.name}</h2>
        <img width="100px" className="productImage" src={product.imageUrl} />
        <h3>{product.price}</h3>
        <h3>{product.helpfulness}</h3>
        <h3>{product.description}</h3>
        <button className="addToCartButton">Add To Cart</button>
      </li>
    )
  }
}
