import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as d3 from 'd3'


class BarDataSeries extends Component {
  render() {
    return (
      <div>BarGraph DataSeries Component</div>
    )
  }
}

const mapState = null;
const mapDispatch = null;

export default connect (mapState, mapDispatch)(BarDataSeries)

BarDataSeries.propTypes = {
  data: PropTypes.array,
}

BarDataSeries.defaultProps = {
  data: [],
  interpolate: 'linear'
}
