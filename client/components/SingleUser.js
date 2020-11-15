import React from 'react'
import {Link} from 'react-router-dom'
import UserForm from './User-Form'

const defaultState = {
  firstName: '',
  lastName: '',
  email: '',
  address: '',
  paymentInfo: ''
}

export class SingleUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    let user = this.props.user
    this.setState({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      address: user.address,
      paymentInfo: user.paymentInfo
    })
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    await this.props.updateUser(this.props.id, this.state)
    await this.props.getUsers()
  }

  async handleDelete(event) {
    event.preventDefault()
    await this.props.deleteUser(this.props.id)
    await this.props.getUsers()
  }

  render() {
    let {user} = this.props
    let {id, firstName, lastName, email, address, paymentInfo} = user

    //Below buttons should only be visible to admins
    let adminControls = (
      <div className="adminControls">
        <h2>ADMIN CONTROLS FOR USER MANAGEMENT:</h2>
        <h4>USER_ID: {id}</h4>
        <UserForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          state={this.state}
        />
        <button id="deleteUser" onClick={this.handleDelete}>
          Delete User
        </button>
      </div>
    )
    let userButton = <button>Add New User</button>

    return (
      <li>
        <div className="userInfo">
          <Link to={`/users/${id}`}>
            <h2>
              {firstName} {lastName}
            </h2>
          </Link>
          <h3>${price}</h3>
          <h3>Helpfulness: {helpfulness}</h3>
          <h3>{description}</h3>
        </div>
        {this.props.isAdmin && adminControls}
        {!this.props.isAdmin && userButton}
      </li>
    )
  }
}

export default SingleUser
