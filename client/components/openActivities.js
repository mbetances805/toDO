import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import ActivityList from './activityList'

class OpenActivities extends Component {
  render () {
    const today = new Date();
    const day = today.toString().slice(0, 3)
    const monthDate = today.toString().slice(4, 10)
    return (
      <div>
        <div className="container">
          <div className="wrapper">
            <span id="day" style={{color: '#8cb7e9'}}>{day}, </span><span id="day">{monthDate}</span>
          </div>
          <ActivityList />
        </div>
      </div>
    )
  }
}

const mapState = null;
const mapDispatch = null;

export default withRouter(connect (mapState, mapDispatch)(OpenActivities));
