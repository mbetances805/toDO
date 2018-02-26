import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as d3Axis from 'd3-axis'
import { select } from 'd3-selection'

class Axis extends Component{
  componentDidMount() {
    this.renderAxis()
  }

  componentDidUpdate() {
    this.renderAxis()
  }

  renderAxis = () => {
    const axisType = `axis${this.props.orientation}`
    const axis = d3Axis[axisType]()
          .scale(this.props.scale)
          .tickSize(this.props.tickSize)
          .tickPadding([12])
          .ticks(4)

    select(this.axisElement).call(axis)
  }

  render() {
    return (
      <g
        className={`Axis-Axis-${this.props.orientation}`}
        ref={(element) => { this.axisElement = element }}
        transform={this.props.translate}
      />
    )
  }
}

const mapState = null;
const mapDispatch = null;

export default connect(mapState, mapDispatch)(Axis)
