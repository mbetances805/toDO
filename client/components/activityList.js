import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { deleteActivity, fetchActivities, updateActivity } from '../store/activity'
import PropTypes from 'prop-types'


class ActivityList extends Component {

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

  convertToUTCTime = date => {
    const utcTime = new Date(date);
    return utcTime.getFullYear() + '-' +
      (('0' + (utcTime.getMonth() + 1)).slice(-2)) + '-' +
      (('0' + utcTime.getDate()).slice(-2)).toString();
  };

  render() {
    const { activities }  = this.props;
    const comparisonDate = this.convertToUTCTime(Date.now());
    let activityCheckButton = '';
    let activityName = '';
    let checkImage = '';
    let binImage = '';
    let link = '';
    let endOfText = '';

    const urlify = (text, linkStart, space)  => {
      link = text.substring(linkStart, space);
    };
// temporary solution for hyperlink - to be updated
    const removeURL = text => {
      let linkEnd = 0
      let updatedText = '';
      let linkStart = text.indexOf('http');
      let urlRegEx = /(\b(((https?|ftp|file|):\/\/)|www[.])[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig
      link = text.match(urlRegEx);

      if (link) {
        linkEnd = linkStart + link[0].length;
      }

      let textSub = text.substring(linkEnd);

      if (linkStart > -1) {
        if (linkStart === 0) {
          updatedText = text
          urlify(text, linkStart, text.length)
        } else {
          updatedText = text.substring(0, linkStart);
          urlify(text, linkStart, linkEnd)
            endOfText = textSub;
         return updatedText
        }
      } else {
        link = '';
        endOfText = '';
        return text
      }
    };

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
              activityCheckButton = 'activity-disabled-check';
              activityName = 'activity-name-inactive';
              checkImage = 'https://image.flaticon.com/icons/svg/149/149691.svg';
              binImage = 'https://img-fi-n2.akamaized.net/icons/svg/149/149343.svg';
            } else {
              activityCheckButton = 'activity-check';
              activityName = 'activity-name-active';
              checkImage = 'https://img-fi-n2.akamaized.net/icons/svg/149/149148.svg';
              binImage = 'https://img-fi-n2.akamaized.net/icons/svg/149/149343.svg';
            }

            return (
              <div className="activity-list" key={activity.id}>
                <div className="activity-container">
                  <span id={`activity-list-${activity.id}`} className={activityName}>{removeURL(activity.activityDescription)}
                    <a href={link}>{link}</a>
                    <span> {endOfText}</span>
                  </span>
                  <span className="activity-button-container">
                    <span className="activity-date">{(this.convertToUTCTime(activity.updatedAt)).slice(5).replace(/-/, '/')}</span>
                    <img
                      className={activityCheckButton}
                      src={checkImage}
                      alt="check"
                      id={`check-button${activity.id}`}
                      onClick={this.handleCheck(activity)}
                      disabled={true}
                    />
                    <img
                      className="activity-delete"
                      src={binImage}
                      alt="delete"
                      id={`delete-button${activity.id}`}
                      onClick={this.handleDelete(activity.id)}
                    />
                  </span>
                </div>
              </div>
            )
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
