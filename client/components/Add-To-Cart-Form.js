import React from 'react'

const AddToCartForm = props => {
  const handleChange = props.handleChange
  const handleSubmit = props.handleSubmit
  const state = props.state
  const quantity = props.quantity
  return (
    <div className="quantity selector">
      <form onSubmit={handleSubmit}>
        <label htmlFor="numberOfItems">Select Duck Quantity</label>
        <input
          type="number"
          id="numberOfItems"
          name="cartQuantity"
          min="1"
          max={quantity}
          value={state.cartQuantity}
          onChange={handleChange}
        />
        <button className="addToCartButton">Add to Cart</button>
      </form>
    </div>
  )
}

export default AddToCartForm
