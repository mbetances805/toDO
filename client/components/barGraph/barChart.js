import React, { Component } from 'react'
import { connect } from 'react-redux'
import { component } from 'react-redux'
import { PropTypes } from 'prop-types'
import { scaleTime, scaleLinear } from 'd3-scale'
import Chart from '../chart'
import DataSeries from '../index'
import { descending } from 'd3-array'

class BarChart extends Component {
  render () {
    return (
      <div>
        BarChart Component
      </div>
    )
  }
}

const mapState = null

const mapDispatch = null

export default connect(mapState, mapDispatch)(BarChart)

BarChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

BarChart.defaultProps = {
  width: 600,
  height: 400,
};
