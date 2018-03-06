import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { scaleTime, scaleLinear} from 'd3-scale'
import Chart from './chart'
import DataSeries from './dataSeries'
import { descending } from 'd3-array'
// import Tooltip from './tooltip'


class LineChart extends Component {
  render() {
    let { data } = this.props,
        size = {width: this.props.width, height: this.props.height};

    let completedDataSeries = data[0]
    let createdDataSeries = data[1]
    let sortedCompletedDataSeries = completedDataSeries.sort((a, b) => {
      return descending(a.date, b.date)
    });
    let sortedCreatedDataSeries = createdDataSeries.sort((a,b) => {
      return descending(a.date, b.date)
    })

    let margins = {top: 2, right: 15, bottom: 20, left: 20};

    // calculate the min and max of the x and y axis based on our data
    // let maxDate = Math.max.apply(Math, data.map((element) => { return element.date }))
    // let minDate = Math.min.apply(Math, data.map((element) => { return  element.date}))
    let calculateMaxNumber = (function () {
      let completedMax = Math.max.apply(Math, completedDataSeries.map((element) => {
        return element.tally;
      }))
      
      let createdMax = Math.max.apply(Math, createdDataSeries.map((element) => {
        return element.tally
      }))
      return Math.max(completedMax, createdMax)
    })()

    let xScale = scaleTime()
        .domain([new Date(2017, 11, 1), new Date(2018, 11, 31)])
        .range([margins.left, this.props.width - margins.left - margins.right]);

    let yScale = scaleLinear()
        .domain([0, calculateMaxNumber])
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
          <DataSeries
            data={sortedCompletedDataSeries}
            size={size}
            xScale={xScale}
            yScale={yScale}
            color="limegreen"
          />
          <DataSeries
            data={sortedCreatedDataSeries}
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
