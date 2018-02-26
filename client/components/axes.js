import React from 'react'
import Axis from './axis'

export default ({ scales, margins, svgDimensions }) => {
  const { height, width } = svgDimensions;

  const xProps = {
    orientation: 'Bottom',
    scale: scales.xScale,
    translate: `translate(0, ${height - margins.bottom})`,
    tickSize: 5,
  }

  const yProps = {
    orientation: 'Left',
    scale: scales.yScale,
    translate: `translate(${margins.left}, 0)`,
    tickSize: 5,
  }

  return (
    <g>
      <Axis {...xProps} />
      <Axis {...yProps} />
    </g>
  )
}
