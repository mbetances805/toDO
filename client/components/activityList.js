import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { deleteActivity, fetchActivities, updateActivity } from '../store/activity'
import bin from '../../images/rubbish-bin.png'
import check from '../../images/checked.png'
import binHover from '../../images/rubbish-bin-hover.png'
import checkHover from '../../images/checked-hover.png'
import checkDisabled from '../../images/checked-disabled.png'
import PropTypes from 'prop-types'


class ActivityList extends Component {
  constructor() {
    super()
    this.state = {
      buttonCheckHover: '',
      buttonBinHover: ''
    }
  }

  componentDidMount() {
    const { userId } = this.props;
    this.props.getActivities(userId);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleCheckHover = this.handleCheckHover.bind(this);
    this.handleBinHover = this.handleBinHover.bind(this);
  }

  handleDelete = id => evt => {
    this.props.removeActivity(id);
  };

  handleCheck = activity => evt => {
    this.props.editActivity({...activity, activityStatus: 'inactive'})
  };

  handleCheckHover = element => evt => {
    if (Number(this.state.buttonCheckHover === element)) {
      this.setState({buttonCheckHover: ''})
    } else {
      this.setState({buttonCheckHover: element})
    }
  };

  handleBinHover = element => evt => {
    if (Number(this.state.buttonBinHover === element)) {
      this.setState({buttonBinHover: ''})
    } else {
      this.setState({buttonBinHover: element})
    }
  };


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
            const utcTime = new Date(activity.activityDate);
            const activityDate = utcTime.getFullYear() + '-' +
              (('0' + (utcTime.getMonth() + 1)).slice(-2)) + '-' +
              (('0' + utcTime.getDate()).slice(-2)).toString();
            return activityDate === comparisonDate || activity.activityStatus === 'active'
          })
          .map(activity => {
            if (activity.activityStatus === 'inactive') {
              return (
                <div className="activity-list" key={activity.id}>
                  <span className="activity-name-inactive">{activity.activityDescription}</span>
                  <div className="activity-check" disabled={true} onClick={this.handleCheck(activity)}>
                    <img src={checkDisabled} alt="check" id={`check-button${activity.id}`} /></div>
                  <div
                    className="activity-delete" onClick={this.handleDelete(activity.id)}
                      onMouseEnter={this.handleBinHover(activity.id)} onMouseLeave={this.handleBinHover(activity.id)}>
                    {
                      Number(this.state.buttonBinHover) === activity.id ?
                        <img src={binHover} alt="delete" id={`delete-button${activity.id}`} />
                        : <img src={bin} alt="delete" id={`delete-button${activity.id}`} />
                    }
                  </div>
                </div>
              )
            } else {
              return (
                <div className="activity-list" key={activity.id}>
                <span className="activity-name-active">{activity.activityDescription}</span>
                <div
                  className="activity-check" onClick={this.handleCheck(activity)}
                    onMouseEnter={this.handleCheckHover(activity.id)} onMouseLeave={this.handleCheckHover(activity.id)}>
                  {
                    Number(this.state.buttonCheckHover) === activity.id ?
                      <img src={checkHover} alt="check" id={`check-button${activity.id}`} />
                      : <img src={check} alt="check" id={`check-button${activity.id}`}  />
                  }
                </div>
                <div
                  className="activity-delete" onClick={this.handleDelete(activity.id)}
                    onMouseEnter={this.handleBinHover(activity.id)} onMouseLeave={this.handleBinHover(activity.id)}>
                  {
                    Number(this.state.buttonBinHover) === activity.id ?
                      <img src={binHover} alt="delete" id={`delete-button${activity.id}`} />
                      : <img src={bin} alt="delete" id={`delete-button${activity.id}`} />
                  }
                </div>
                </div>
              )
            }
        })
      }
      </div>
    )
  }
}

const mapState = state => ({
  activities: state.activity,
  userId: state.user.id
});

const mapDispatch = dispatch => ({
  editActivity: (id) => {
    dispatch(updateActivity(id))
  },
  getActivities: (id) => {
    dispatch(fetchActivities(id))
  },
  removeActivity: (id) => {
    dispatch(deleteActivity(id))
  }
});

export default withRouter(connect(mapState, mapDispatch)(ActivityList))

ActivityList.propTypes = {
  userId: PropTypes.number.isRequired,
  activities: PropTypes.object,
  editActivity: PropTypes.func.isRequired,
  getActivities: PropTypes.func.isRequired,
  removeActivity: PropTypes.func.isRequired
};
