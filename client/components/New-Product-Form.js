import React from 'react'

const EditProductForm = props => {
  return (
    <div className="adminControls">
      <h2>ADMIN STOCK CONTROLS:</h2>
      <h4>Current Stock Level: {quantity}</h4>
      <div className="changeStock">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="changeName">Change Name:</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <label htmlFor="changePrice">Change Price:</label>
          <input
            type="number"
            name="price"
            value={this.state.price}
            onChange={this.handleChange}
          />
          <label htmlFor="changeDescription">Change Description:</label>
          <input
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          />
          <label htmlFor="changeHelpfulness">Change Helpfulness:</label>
          <input
            type="number"
            name="helpfulness"
            value={this.state.helpfulness}
            onChange={this.handleChange}
          />
          <label htmlFor="changeStock">Update Stock Level:</label>
          <input
            type="number"
            name="quantity"
            min="0"
            value={this.state.quantity}
            onChange={this.handleChange}
          />
          <button>Confirm Changes</button>
        </form>
        <button id="deleteDuck" onClick={this.handleDelete}>
          Delete Duck
        </button>
      </div>
    </div>
  )
}

export default EditProductForm
