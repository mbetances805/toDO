import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ActivityList from './activityList'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email} = props
  const today = new Date();
  const day = today.toString().slice(0, 3)
  const monthDate = today.toString().slice(4, 10)
  return (
    <div>
      <h3 style={{textAlign: 'center'}}>Welcome, <br /> {email}</h3>
      <div className="wrapper">
        <div id="day">{day},</div>
        <div id="day">{monthDate}</div>
      </div>
      <ActivityList />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
