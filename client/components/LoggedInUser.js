import React from 'react'
import {connect} from 'react-redux'
import UserForm from './User-Form'
import {me, updateUserProfile} from '../store/user'
import {Link} from 'react-router-dom'

class User extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getSingleUser()
  }

  render() {
    const {singleUser, isAdmin, getSingleUser, updateUser} = this.props || {}
    const {
      firstName,
      lastName,
      email,
      streetAddress,
      city,
      zipCode,
      cardNumber
    } = singleUser

    return (
      <div className="loggedInUser">
        <div id="userProfile">
          <h2>User Profile</h2>
          <h3>
            Welcome back, {firstName} {lastName}
          </h3>
          <div id="profileDetail">
            <li>
              <b>Name:</b> {firstName} {lastName}
            </li>
            <li>
              <b>Email Address:</b> {email}
            </li>
            <li>
              <b>Default Shipping Address:</b> <br />
              <div id="detetailedUserAddress">
                <span>Street: {streetAddress}</span> <br />
                <span>City: {city}</span> <br />
                <span>Zip Code: {zipCode}</span>
              </div>
            </li>
            <li>
              <b>Card Number:</b> {cardNumber}
            </li>
          </div>
        </div>
        <div>
          {/* //*add updateuser function */}
          <UserForm
            user={singleUser}
            getUser={getSingleUser}
            handleUpdate={updateUser}
          />
        </div>
        {isAdmin && <Link to="/users">View All Users</Link>}
      </div>
    )
  }
}

const mapState = state => ({
  singleUser: state.user,
  isAdmin: state.user.admin
})

const mapDispatch = dispatch => ({
  getSingleUser: () => dispatch(me()),
  updateUser: userInfo => dispatch(updateUserProfile(userInfo))
})

const LoggedInUser = connect(mapState, mapDispatch)(User)
export default LoggedInUser
