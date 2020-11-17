import React from 'react'

export class SingleUser extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let {user} = this.props
    let {id, firstName, lastName, email} = user
    return (
      <div className="singleUser">
        <img src="User_Icon.png" width="100" height="100" />
        <div>
          <h3>UserID: {id}</h3>
          <h3>
            UserName: {firstName} {lastName}
          </h3>
          <h3>Email Address: {email}</h3>
        </div>
      </div>
    )
  }
}

export default SingleUser
