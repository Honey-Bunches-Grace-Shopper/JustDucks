import React from 'react'
import {connect} from 'react-redux'
import UpdateUser from './UpdateUser'
import {} from '../store/user'

class User extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getSingleUser()
  }

  render() {
    console.log('user-->', user)
    const {user} = this.props
    const {
      id,
      firstName,
      lastName,
      email,
      address,
      paymentInfo,
      isAdmin,
      password
    } = user

    return (
      <div id="userProfile">
        <h2>User Profile</h2>
        <h3>
          Welcome back, {firstName} {lastName}
        </h3>
        <ul id="profileDetail">
          <li>
            Name: {firstName} {lastName}
          </li>
          <li>Email Address: {email}</li>
          <li>Default Shipping Address: {address}</li>
          <li>Payment Info: {paymentInfo}</li>
          <li>Password: {password}</li>
        </ul>
        <div>
          {/* //*add updateuser function */}
          <UpdateUser userId={id} />
        </div>
        {isAdmin ? (
          <div>
            Admin Settings
            <button type="button" onClick={() => {}}>
              Set as Admin
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
}

const mapState = state => ({
  singleUser: state.user
})

const mapDispatch = dispatch => ({
  getSingleUser: () => dispatch()
})

const SingleUser = connect(mapState, mapDispatch)(User)
export default SingleUser
