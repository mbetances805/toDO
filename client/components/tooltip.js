import React, { Component } from 'react'
import { connect } from 'react-redux'
import { select } from 'd3-selection'
import * as d3 from 'd3' //update and import specific d3.mouse module

class Tooltip extends Component {
  handleMouseOver(d, i) {
    console.log('test', this.props)
    const { xScale } = this.props
    let x0 = xScale.invert(d3.mouse(this)[0])
    console.log('test', x0)
  }
  render() {
    // let focusText = focus.append('text')
    //                   .attr('x', 9)
    //                   .attr('dy', '.35em')
    return (
      <g onMouseOver={this.handleMouseOver} className="focus" >
        <circle r="7.5" />
      </g>
    )
  }
}

const mapState = null;
const mapDispatch = null;

export default connect(mapState, mapDispatch)(Tooltip)
