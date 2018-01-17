import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class CompleteActivities extends Component {
  render () {
    return (
      <div>Complete Activities</div>
    )
  }
}

const mapState = null;
const mapDispatch = null;

export default withRouter (connect(mapState, mapDispatch)(CompleteActivities))