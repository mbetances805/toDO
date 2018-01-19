import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { deleteActivity, fetchActivities, updateActivity } from '../store/activity'

class ActivityList extends Component {
  componentDidMount() {
    const { userId } = this.props;
    this.props.getActivities(userId);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleDelete = id => evt => {
    this.props.removeActivity(id);
  }

  handleCheck = activity => evt => {

    // this.props.updateActivity({...activitis})
  }

  render() {
    const { activities }  = this.props;
    const today = new Date();
    const comparisonDate = today.getFullYear() + '-' +
    (('0' + (today.getMonth() + 1)).slice(-2)) + '-' +
    (('0' + today.getDate()).slice(-2)).toString();
    return (
      <div>
        {
          activities.allActivities && activities.allActivities
          .filter(activity => {
            return activity.activityDate.slice(0, 10) === comparisonDate})
          .map(activity => {
            return (
              <div className="activity-list" key={activity.id}>
              <span id="activity-name">{activity.activityDescription}</span>
              <button id="activity-check" onClick={this.handleCheck(activity)}>check</button>
              <button id="activity-delete" onClick={this.handleDelete(activity.id)}>delete</button>
              </div>
            )
        })
      }
      </div>
    )
  }
}

const mapState = state => ({
  userId: state.user.id,
  activities: state.activity
})

const mapDispatch = dispatch => ({
  removeActivity: (id) => {
    dispatch(deleteActivity(id))
  },
  getActivities: (id) => {
    dispatch(fetchActivities(id))
  },
  editActivity: (id) => {
    dispatch(updateActivity(id))
  }
})

export default withRouter(connect(mapState, mapDispatch)(ActivityList))
