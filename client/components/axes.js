import React from 'react'
import { connect } from 'react-redux'
import Axis from './axis'

export default ({ scales, margins, svgDimensions }) => {
  const { height, width } = svgDimensions;

  const xProps = {
    orientation: 'Bottom',
    scale: scales.xScale,
    translate: `translate(0, ${height - margins.bottom})`,
    tickSize: height - margins.top - margins.bottom,
  }

  const yProps = {
    orientation: 'Left',
    scale: scales.yScale,
    translate: `translate(${margins.left}, 0)`,
    tickSize: width - margins.left - margins.right,
  }

  return (
    <g>
      <Axis {...xProps} />
      <Axis {...yProps} />
    </g>
  )
}
