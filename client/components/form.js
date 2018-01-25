import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { postActivity } from '../store/activity'
import PropTypes from 'prop-types'

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
    if (this.state.text === '') {
      if (!document.getElementById('warning-p')){
        const warning = document.createElement('p');
        const textNode = document.createTextNode('Please enter an activity!')
        warning.appendChild(textNode);
        warning.setAttribute('id', 'warning-p')
        document.getElementById('new-activity-form').appendChild(warning);
      }
    } else {
      if (document.getElementById('warning-p')) {
        document.getElementById('new-activity-form').removeChild(document.getElementById('warning-p'))
      }
      const userId = this.props.userId;
      const activityDescription = this.state.text;
      const activityStatus = 'active';
      this.props.addActivity({ activityDescription, activityStatus, activityDate, userId });
      this.setState({text: ''});
    }
  }

  handleChange = (evt) => {
    this.setState({text: evt.target.value});
  };

  render() {
    const { text } = this.state;
    const activityDate = new Date();
    return (
      <div>
        <br />
        <form id="new-activity-form" onSubmit={this.handleSubmit(activityDate)}>
          <input
            type="text"
            value={text}
            onChange={this.handleChange}
            placeholder="What do you have to do today?"
            name="ActivityDescription"
          />
        </form>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    userId: state.user.id
  }
};

const mapDispatch = (dispatch) => ({
  addActivity: (activity) => {
    dispatch(postActivity(activity));
  }
});

export default withRouter(connect(mapState, mapDispatch)(Form));

Form.propTypes = {
  userId: PropTypes.number.isRequired,
  addActivity: PropTypes.func.isRequired
};
