import React from 'react'

class UpdateUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      address: '',
      paymentInfo: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const userInfo = this.state
    this.props.handleUpdate(userInfo)
    this.setState({
      name: '',
      email: '',
      address: '',
      paymentInfo: ''
    })
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Edit User Details</h3>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <label htmlFor="address">Address</label>
        <input
          type="text"
          name="address"
          value={this.state.address}
          onChange={this.handleChange}
        />
        <label htmlFor="paymentInfo">PaymentInfo</label>
        <input
          type="text"
          name="paymentInfo"
          value={this.state.paymentInfo}
          onChange={this.handleChange}
        />

        <button type="submit">Save Changes</button>
      </form>
    )
  }
}

export default UpdateUser
