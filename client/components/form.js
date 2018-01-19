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
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleSubmit = today => evt => {
    evt.preventDefault();
    const userId = this.props.userId;
    const activityDescription = this.state.text;
    this.props.addActivity({ activityDescription, today, userId });
    this.setState({text: ''});
  }

  handleChange = (evt) => {
    this.setState({text: evt.target.value});
  }

  handleDelete = (evt) => {
    this.props.removeActivity((evt.target.id));
  }

  render() {
    const { text } = this.state;
    const today = new Date();
    const currentDate = today.toString().slice(4, 15);
    const day = today.toString().slice(0, 4);
    return (
      <div className="container">
        <div className="wrapper">
          <span id="day">{day}, {currentDate.toString()}</span>
        </div>
        <br />
        <div id="new-activity-title">To Do List</div>
        <form id="new-activity-form" onSubmit={this.handleSubmit(today)}>
          <input
            type="text"
            value={text}
            onChange={this.handleChange}
            placeholder="What do you have to accomplish today?"
            name="ActivityDescription"
          />
          <button id="input-button" type="submit">+</button>
          <button id="delete-button">-</button>
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
