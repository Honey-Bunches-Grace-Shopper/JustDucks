import React from 'react'

const ProductForm = props => {
  console.log(props)
  const handleChange = props.handleChange
  const handleSubmit = props.handleSubmit
  const state = props.state
  return (
    <div className="changeStock">
      <form onSubmit={handleSubmit}>
        <label htmlFor="changeName">Change Name:</label>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
        />
        <label htmlFor="changePrice">Change Price:</label>
        <input
          type="number"
          name="price"
          value={state.price}
          onChange={handleChange}
        />
        <label htmlFor="changeDescription">Change Description:</label>
        <input
          type="text"
          name="description"
          value={state.description}
          onChange={handleChange}
        />
        <label htmlFor="changeHelpfulness">Change Helpfulness:</label>
        <input
          type="number"
          name="helpfulness"
          value={state.helpfulness}
          onChange={handleChange}
        />
        <label htmlFor="changeStock">Update Stock Level:</label>
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
