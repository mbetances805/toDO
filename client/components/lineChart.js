import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { scaleTime, scaleLinear} from 'd3-scale'
import Chart from './chart'
import CompletedDataSeries from './completedDataSeries'
import { descending } from 'd3-array'
// import Tooltip from './tooltip'


class LineChart extends Component {
  render() {
    let { data } = this.props,
        size = {width: this.props.width, height: this.props.height};

    let sortedData = [... data]
    sortedData = sortedData.sort((a, b) => {
      return descending(a.date, b.date)
    });

    let margins = {top: 2, right: 15, bottom: 20, left: 20};

    // calculate the min and max of the x and y axis based on our data
    // let maxDate = Math.max.apply(Math, data.map((element) => { return element.date }))
    // let minDate = Math.min.apply(Math, data.map((element) => { return  element.date}))
    let maxNumberCompleted = Math.max.apply(Math, data.map((element) => {
        return element.numberCompleted;
      }
    ))

    let xScale = scaleTime()
        .domain([new Date(2017, 11, 1), new Date(2018, 11, 31)])
        .range([margins.left, this.props.width - margins.left - margins.right]);

    let yScale = scaleLinear()
        .domain([0, maxNumberCompleted])
        .range([this.props.height - margins.top - margins.bottom, margins.bottom]);

    return (
      <div className="chart-container">
        <Chart
          width={this.props.width}
          height={this.props.height}
          xScale={xScale}
          yScale={yScale}
          margins={margins}
        >
          <CompletedDataSeries
            data={sortedData}
            size={size}
            xScale={xScale}
            yScale={yScale}
            color="cornflowerblue"
          />
          {/* Tooltip Component is still WIP
          <Tooltip
            xScale={xScale}
            yScale={yScale}
            width={this.props.width}
            height={this.props.height}
            data={this.props.data}
            /> */}
        </Chart>
      </div>
    )
  }
}

const mapState = null;
const mapDispatch = null;

export default connect(mapState, mapDispatch)(LineChart)

LineChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

LineChart.defaultProps = {
  width: 600,
  height: 400,
};
