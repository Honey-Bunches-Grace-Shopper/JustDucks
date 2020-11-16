import React from 'react'

export class SingleUser extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let {user} = this.props
    let {
      id,
      firstName,
      lastName,
      email,
      streetAddress,
      city,
      zipCode,
      paymentInfo
    } = user
    return (
      <li>
        <div>
          <h3>UserID: {id}</h3>
          <h3>
            UserName: {firstName} {lastName}
          </h3>
          <h3>
            Default Shipping Address: {streetAddress}, {city}, {zipCode}
          </h3>
          <h3>Email Address: {email}</h3>
          <h3>Payment Info:{paymentInfo}</h3>
        </div>
      </li>
    )
  }
}

export default SingleUser
