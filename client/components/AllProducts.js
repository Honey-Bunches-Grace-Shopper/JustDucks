import React from 'react'
import SingleProduct from './SingleProduct'

export class AllProducts extends React.Component {
  constructor(props) {
    super(props)
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
