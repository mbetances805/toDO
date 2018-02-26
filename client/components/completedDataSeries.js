import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// import { line } from 'd3-shape'
import * as d3 from 'd3'
import CompletedLineGraph from './completedLineGraph'

class CompletedDataSeries extends Component{
  render() {
      let self = this,
          props = this.props,
          yScale = props.yScale,
          xScale = props.xScale;

      let path = d3.line()
          .x(function(d) { return xScale(d.date) })
          .y(function(d) { return yScale(d.numberCompleted) })
          .curve(d3.curveLinear);

    return (
      <CompletedLineGraph path={path(this.props.data)} color={this.props.color} />
    )
  }
}

const mapState = null;
const mapDispatch = null;

export default connect(mapState, mapDispatch)(CompletedDataSeries)

CompletedDataSeries.propTypes = {
  data: PropTypes.array,
  interpolate: PropTypes.string
}

CompletedDataSeries.defaultProps = {
  data: [],
  interpolate: 'linear'
}
