import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

const Welcome = () => {
  return (
    <div className="animation-wrapper">
      <h1 className="welcome-animation">
        Track your daily to do list.
      </h1>
    </div>
  )
}

const mapState = null;

const mapDispatch = null;

export default withRouter(connect(mapState, mapDispatch)(Welcome))
