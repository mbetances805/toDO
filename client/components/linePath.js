import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class LinePath extends Component {
  render() {
    return (
      <path d={this.props.path} stroke={this.props.color} strokeWidth={this.props.width}
        fill='none' />
    )
  }
}

const mapState = null;
const mapDispatch = null;

export default connect(mapState, mapDispatch)(LinePath)

LinePath.propTypes = {
  path: PropTypes.string,
  color: PropTypes.string,
  width: PropTypes.number
};

LinePath.defaultProps = {
  path: '',
  color: 'blue',
  width: 2
};
