import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class OpenActivities extends Component {
  render () {
    return (
      <div>OpenActivities</div>
    )
  }
}

const mapState = null;
const mapDispatch = null;

export default withRouter(connect (mapState, mapDispatch)(OpenActivities));
