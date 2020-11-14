import React from 'react'

class UpdateUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      address: '',
      paymentInfo: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const {name, email, address, paymentInfo, password} = this.state
    const {userId} = this.props
    //call update thunk function

    this.setState({
      name: '',
      email: '',
      address: '',
      paymentInfo: '',
      password: ''
    })
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: e.target.value})
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
        <label htmlFor="address">Email</label>
        <input
          type="text"
          name="address"
          value={this.state.address}
          onChange={this.handleChange}
        />
        <label htmlFor="paymentInfo">Email</label>
        <input
          type="text"
          name="paymentInfo"
          value={this.state.paymentInfo}
          onChange={this.handleChange}
        />
        <label htmlFor="password">Email</label>
        <input
          type="text"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <button type="submit">Save Changes</button>
      </form>
    )
  }
}

export default UpdateUser
