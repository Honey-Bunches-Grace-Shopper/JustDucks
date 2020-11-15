import React from 'react'
import {connect} from 'react-redux'
import SingleUser from './SingleUser'

class Users extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    const isAdmin = this.props.isAdmin || ''
    console.log(isAdmin)
    const {users} = this.props || {}
    return (
      <div>
        <h2>All Users:</h2>
        <ol>
          {users.map(user => (
            <SingleUser
              user={user}
              key={user.id}
              id={user.id}
              isAdmin={isAdmin}
              updateUser={this.props.updateUser}
              deleteUser={this.props.deleteUser}
            />
          ))}
        </ol>
      </div>
    )
  }
}

const mapState = state => ({
  users: state.users,
  isAdmin: state.user.admin
})

const mapDispatch = dispatch => ({
  getUsers: () => dispatch(fetchUsers()),
  updateUser: (id, userInfo) => updateOneUser(id, userInfo),
  deleteUser: id => deleteOneUser(id)
})

const AllUsers = connect(mapState, mapDispatch)(Users)
export default AllUsers
