import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { BarChart } from './barChart'
import { timeParse } from 'd3-time-format'

// temporary solution
class BarSummary extends Component {
  checkMostActiveDay = () => {
    let mostActiveDay = ''
    let maxValue =  0
    for (let key in this.props.data) {
      if (this.props.data[key] > maxValue) {
        maxValue = this.props.data[key]
        mostActiveDay = key
      }
    }
    return mostActiveDay
  }

  render() {
    let { data } = this.props
    return (
      <div className='most-active-day'>
        {this.checkMostActiveDay()}
        <p className='overall-summary-details'>Most Productive Day</p>
      </div>
    )
  }
}

const mapState = null
const mapDispatch  = null

export default connect(mapState, mapDispatch)(BarSummary)
