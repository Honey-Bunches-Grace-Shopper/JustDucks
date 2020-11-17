import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <div className="navBar">
      <nav>
        <Link to="/products">View All Ducks</Link>
        {isLoggedIn ? (
          <>
            {/* The navbar will show these links after you log in */}
            <Link className="home-link" to="/home">
              Home
            </Link>
            <Link to="/me">User Profile</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </>
        ) : (
          <>
            {/* The navbar will show these links before you log in */}
            <Link className="login-link" to="/login">
              Login
            </Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
        <Link to="/cart">Nest</Link>
      </nav>
    </div>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
