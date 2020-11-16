import React from 'react'

class UserForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      streetAddress: '',
      city: '',
      zipCode: '',
      paymentInfo: '',
      ...this.props.user,
      name:
        (this.props.user.firstName || '') +
        ' ' +
        (this.props.user.lastName || '')
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.handleUpdate(this.state)
    this.setState({
      name: '',
      email: '',
      streetAddress: '',
      city: '',
      zipCode: '',
      paymentInfo: ''
    })
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  render() {
    return (
      <form id="userForm" onSubmit={this.handleSubmit}>
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
        <label htmlFor="streetAddress">Street Address</label>
        <input
          type="text"
          name="streetAddress"
          value={this.state.streetAddress}
          onChange={this.handleChange}
        />
        <label htmlFor="city">City</label>
        <input
          type="text"
          name="city"
          value={this.state.city}
          onChange={this.handleChange}
        />
        <label htmlFor="zipCode">Zip Code</label>
        <input
          type="text"
          name="zipCode"
          value={this.state.zipCode}
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

export default UserForm
