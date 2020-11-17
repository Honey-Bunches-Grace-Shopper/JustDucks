import React from 'react'
import {connect} from 'react-redux'
import SingleUser from './SingleUser'
import {fetchUsers} from '../store/users'

class Users extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    const isAdmin = this.props.isAdmin || ''
    const {users} = this.props || {}
    return (
      <div>
        <h1 className="center">All Users</h1>
        <ul>
          {users.map(user => (
            <SingleUser user={user} key={user.id} isAdmin={isAdmin} />
          ))}
        </ul>
      </div>
    )
  }
}

const mapState = state => ({
  users: state.users,
  isAdmin: state.user.admin
})

const mapDispatch = dispatch => ({
  getUsers: () => dispatch(fetchUsers())
})

const AllUsers = connect(mapState, mapDispatch)(Users)
export default AllUsers
