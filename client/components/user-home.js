import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import AllProducts from './AllProducts'

/**
 * COMPONENT
 */
export const DisconnectedUserHome = props => {
  const {email} = props

  return (
    <div>
      <h3>Welcome back, {email}</h3>
      <AllProducts />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

const UserHome = connect(mapState)(DisconnectedUserHome)
export default UserHome

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
