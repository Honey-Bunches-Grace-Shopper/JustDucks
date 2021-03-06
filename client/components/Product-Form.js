import React from 'react'

const ProductForm = props => {
  const handleChange = props.handleChange
  const handleSubmit = props.handleSubmit
  const state = props.state
  return (
    <div className="changeStock">
      <form onSubmit={handleSubmit}>
        <label htmlFor="changeName">Name:</label>
        <input
          type="text"
          name="name"
          min="1"
          value={state.name}
          required
          onChange={handleChange}
        />
        <label htmlFor="changePrice">Price:</label>
        <input
          type="number"
          name="price"
          required
          value={state.price}
          onChange={handleChange}
        />
        <label htmlFor="changeDescription">Description:</label>
        <input
          type="text"
          name="description"
          value={state.description}
          onChange={handleChange}
        />
        <label htmlFor="changeHelpfulness">Helpfulness:</label>
        <input
          type="number"
          name="helpfulness"
          min="1"
          value={state.helpfulness}
          onChange={handleChange}
        />
        <label htmlFor="changeStock">Stock Level:</label>
        <input
          type="number"
          name="quantity"
          min="1"
          required
          value={state.quantity}
          onChange={handleChange}
        />
        <label htmlFor="imageUrl">Image URL:</label>
        <input
          type="text"
          name="imageUrl"
          min="0"
          value={state.imageUrl}
          onChange={handleChange}
        />
        <button>Confirm Changes</button>
      </form>
    </div>
  )
}

export default ProductForm
