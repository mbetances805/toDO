import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import Axes from './lineGraph/axes'

class Chart extends Component {
  render() {
    let xScale = this.props.xScale,
        yScale = this.props.yScale,
        svgDimensions = {height: this.props.height, width: this.props.width};

    return (
      <div className="completed-line-graph">
       <h4>{this.props.title}</h4>
          <svg width={this.props.width} height={this.props.height}>
            <Axes
              scales={{ xScale, yScale }}
              margins={this.props.margins}
              svgDimensions={svgDimensions}
            />
            {this.props.children}
          </svg>
      </div>
    )
  }
}

const mapState = null;
const mapDispatch = null;

export default connect(mapState, mapDispatch)(Chart)

Chart.propTypes = {
  title: PropTypes.string,
}

Chart.defaultProps = {
  title: 'Completed by Month'
}
