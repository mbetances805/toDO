import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { postActivity } from '../store/activity'
import ActivityList from './activityList'

class Form extends Component {
  constructor() {
    super()
    this.state = {
      text: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = activityDate => evt => {
    evt.preventDefault();
    const userId = this.props.userId;
    const activityDescription = this.state.text;
    const activityStatus = 'active';
    this.props.addActivity({ activityDescription, activityStatus, activityDate, userId });
    this.setState({text: ''});
  }

  handleChange = (evt) => {
    this.setState({text: evt.target.value});
  }

  render() {
    const { text } = this.state;
    const activityDate = new Date();
    return (
      <div className="container">
        <br />
        <div id="new-activity-title">To Do List</div>
        <form id="new-activity-form" onSubmit={this.handleSubmit(activityDate)}>
          <input
            type="text"
            value={text}
            onChange={this.handleChange}
            placeholder="What do you have to accomplish today?"
            name="ActivityDescription"
          />
        </form>
        <ActivityList />
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    userId: state.user.id,
    activities: state.activity
  }
}

const mapDispatch = (dispatch) => ({
  addActivity: (activity) => {
    dispatch(postActivity(activity));
  }
})

export default withRouter(connect(mapState, mapDispatch)(Form));
