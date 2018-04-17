import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as d3Axis from 'd3-axis'
import { select as selectCurrent } from 'd3-selection'
import { timeFormat as dateFormat} from 'd3-time-format'

class Axis extends Component{
  componentDidMount() {
    this.renderAxis()
  }

  componentDidUpdate() {
    this.renderAxis()
  }

  renderAxis = () => {
    const axisType = `axis${this.props.orient}`
    const axis = d3Axis[axisType]()
          .scale(this.props.scale)
          .tickSize(this.props.tickSize)
          .tickPadding(2)
          .ticks(4)

    if (axisType === 'axisBottom') {
      axis.tickFormat(dateFormat('%b %d'))
    }

    selectCurrent(this.axisElement).call(axis)
  }

  render() {
    return (
      <g
        className={`Axis-Axis-${this.props.orient}`}
        ref={(element) => { this.axisElement = element }}
        transform={this.props.translate}
      />
    )
  }
}

const mapState = null;
const mapDispatch = null;

export default connect(mapState, mapDispatch)(Axis)
