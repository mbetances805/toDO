import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

const Welcome = () => {
  return (
    <div className="animation-wrapper">
      <span className="welcome-animation">
        Track your daily to do list.
      </span>
    </div>
  )
}

const mapState = null;

const mapDispatch = null;

export default withRouter(connect(mapState, mapDispatch)(Welcome))
