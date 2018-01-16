import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

class Form extends Component {
  render() {
    return (
      <div>
        <div id='new-activity-title'>Add Activity</div>
        <br />
        <form id='new-activity-form'>
          <label>Activity Name</label>
          <input
            type="text"
            name="ActivityName"
          />
          <label>Activity Description</label>
          <input
            type="text"
            name="ActivityDescription"
          />
          <label>Start Date</label>
          <input
            type="date"
            name="StartTime"
          />
          <label>Start Time</label>
          <input 
            type="time"
            name="StartTime"
          />
          <label>End Date</label>
          <input
            type="date"
            name="EndDate"
          />
          <label>End Time</label>
          <input
            type="time"
            name="EndTime"
          />
          <label>Complexity</label>
          <input
            type="radio"
            name="Complexity"
            value="Easy"
          /> Easy
          <input
            type="radio"
            name="Complexity"
            value="Moderate"
          /> Moderate
          <input
            type="radio"
            name="Complexity"
            value="Difficult"
          /> Difficult
        </form>
      </div>
    )
  }
}

const mapState = null;

const mapDispatch = null;

export default withRouter(connect(mapState, mapDispatch)(Form))