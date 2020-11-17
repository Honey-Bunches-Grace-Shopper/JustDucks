import React from 'react'

//CR Note: Add front end validations for input fields

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
          value={state.name}
          onChange={handleChange}
        />
        <label htmlFor="changePrice">Price:</label>
        <input
          type="number"
          name="price"
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
          value={state.helpfulness}
          onChange={handleChange}
        />
        <label htmlFor="changeStock">Stock Level:</label>
        <input
          type="number"
          name="quantity"
          min="0"
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
