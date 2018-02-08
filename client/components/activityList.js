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
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleCheckHover = this.handleCheckHover.bind(this);
    this.handleBinHover = this.handleBinHover.bind(this);
    this.convertToUTCTime = this.convertToUTCTime.bind(this);
  }

  componentDidMount() {
    const { userId } = this.props;
    this.props.getActivities(userId);
  }

  handleDelete = id => evt => {
    this.props.removeActivity(id);
  };

  handleCheck = activity => evt => {
    this.props.editActivity({...activity, activityStatus: 'inactive', updatedAt: Date.now()})
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
  
  convertToUTCTime = date => {
    const utcTime = new Date(date);
    return utcTime.getFullYear() + '-' +
      (('0' + (utcTime.getMonth() + 1)).slice(-2)) + '-' +
      (('0' + utcTime.getDate()).slice(-2)).toString();
  };


  render() {
    const { activities }  = this.props;
    const comparisonDate = this.convertToUTCTime(Date.now());
    
    return (
      <div>
        {
          activities.allActivities && activities.allActivities
          .filter(activity => {
            const updatedDateUTC = this.convertToUTCTime(activity.updatedAt);
            return updatedDateUTC === comparisonDate || activity.activityStatus === 'active'
          })
          .map(activity => {
            if (activity.activityStatus === 'inactive') {
              return (
                <div className="activity-list" key={activity.id}>
                  <span className="activity-name-inactive">{activity.activityDescription}</span>
                  <span className="activity-date">{(this.convertToUTCTime(activity.updatedAt)).slice(5).replace(/-/, '/')}</span>
                  <span className="activity-check" disabled={true} onClick={this.handleCheck(activity)}>
                    <img src={checkDisabled} alt="check" id={`check-button${activity.id}`} /></span>
                  <span
                    className="activity-delete" onClick={this.handleDelete(activity.id)}
                      onMouseEnter={this.handleBinHover(activity.id)} onMouseLeave={this.handleBinHover(activity.id)}>
                      <img className="activity-delete" width="15" height="15" src={"https://img-fi-n2.akamaized.net/icons/svg/149/149343.svg"} alt="delete" id={`delete-button${activity.id}`} />
                  </span>
                </div>
              )
            } else {
              return (
                <div className="activity-list" key={activity.id}>
                <span className="activity-name-active">{activity.activityDescription}</span>
                <span className="activity-date">{(this.convertToUTCTime(activity.activityDate)).slice(5).replace(/-/, '/')}</span>
                <span
                  className="activity-check" onClick={this.handleCheck(activity)}
                    onMouseEnter={this.handleCheckHover(activity.id)} onMouseLeave={this.handleCheckHover(activity.id)}>
                  {
                    Number(this.state.buttonCheckHover) === activity.id ?
                      <img width="20" height="20" src={"https://img-fi-n2.akamaized.net/icons/svg/149/149148.svg"} alt="check" id={`check-button${activity.id}`} />
                      : <img width="15" height="15" src={"https://img-fi-n2.akamaized.net/icons/svg/149/149148.svg"} alt="check" id={`check-button${activity.id}`}  />
                  }
                </span>
                <span
                  className="activity-delete" onClick={this.handleDelete(activity.id)}
                    onMouseEnter={this.handleBinHover(activity.id)} onMouseLeave={this.handleBinHover(activity.id)}>
                    <img className="activity-delete"  width="15" height="15" src={"https://img-fi-n2.akamaized.net/icons/svg/149/149343.svg"} alt="delete" id={`delete-button${activity.id}`} />
                </span>
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
