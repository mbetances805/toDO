import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { scaleTime, scaleLinear} from 'd3-scale'
import Chart from './chart'
import CompletedDataSeries from './completedDataSeries'
import { descending } from 'd3-array'
// import _ from 'underscore'

class LineChart extends Component {
  render() {
    let { data } = this.props,
        size = {width: this.props.width, height: this.props.height};

    let sortedData = [... data]

    sortedData = sortedData.sort((a, b) => {
      return descending(a.date, b.date)
    });

    // let max = _.chain(data.series1, data.series2, data.series3)
    //     .zip()
    //     .map(values => {
    //       return _.reduce(values, function(memo, value) {return Math.max(memo, value.y)}, 0)
    //     })
    //     .max()
    //     .value();

    // update to reflect domain from data
    let xScale = scaleTime()
        .domain([new Date(2018, 0, 20), new Date(2018, 2, 1)])
        .range([0, this.props.width]);

    // update to reflect domain from data
    let yScale = scaleLinear()
        .domain([0, 10])
        .range([this.props.height, 0]);

    return (
      <Chart width={this.props.width} height={this.props.height} xScale={xScale} yScale={yScale}>
        <CompletedDataSeries data={sortedData} size={size} xScale={xScale} yScale={yScale} color="cornflowerblue" />
      </Chart>
    )
  }
}

const mapState = null;
const mapDispatch = null;

export default connect(mapState, mapDispatch)(LineChart)

LineChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
};

LineChart.defaultProps = {
  width: 400,
  height: 300
};
