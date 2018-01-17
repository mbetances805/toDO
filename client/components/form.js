import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { fetchActivities } from '../store/activity'

class Form extends Component {
  componentDidMount() {
    this.props.getActivities();
  }

  render() {
    const { activities } = this.props
    console.log('allActivities', activities)
    const today = new Date();
    const day = today.toString().slice(0, 4);
    const calendarDate = today.toString().slice(4, 16);
    return (
      <div className='container'>
        <div id='new-activity-title'>To Do List</div>
        <span>{day}</span>, <span>{calendarDate}</span>
        <br />
        <form id='new-activity-form'>
          <label>Activity Description</label>
          <input
            type="text"
            name="ActivityDescription"
          />
          <button id='input-button'>+</button>
          <button id='delete-button'>-</button>
        </form>
        {
          activities.allActivities && activities.allActivities.map(activity => {
            return (
              <div className='activity-list' key={activity.id}>
              <span id='activity-name'>{activity.activityDescription}</span>
              <button id='activity-check'>check</button>
              <button id='activity-delete'>delete</button>
              </div>
          )})
        }
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    activities: state.activity
  }
}

const mapDispatch = (dispatch) => ({
  getActivities: () => {
    dispatch(fetchActivities())
  }
})

export default withRouter(connect(mapState, mapDispatch)(Form));