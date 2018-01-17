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
      <div>
        <div id='new-activity-title'>To Do</div>
        <span>{day}</span>, <span>{calendarDate}</span>
        <br />
        <form id='new-activity-form'>
          <label>Activity Description</label>
          <input
            type="text"
            name="ActivityDescription"
          />
          <button>+</button>
          <button>-</button>
        </form>
        {
          console.log('all', activities)
        }
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    activities: state
  }
}

const mapDispatch = (dispatch) => ({
  getActivities: () => {
    dispatch(fetchActivities())
  }
})

export default withRouter(connect(mapState, mapDispatch)(Form));