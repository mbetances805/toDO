import React, { Component } from 'react'
import { connect } from 'react-redux'
import Summary from './summary'
import { fetchActivities } from '../store/activity'

class Dashboard extends Component {
  componentDidMount(){
    const { userId } = this.props;
    this.props.getActivities(userId);
  }

  caculateTotalActive = () => {
    const { activities } = this.props;
    let activeTotal = 0;

    activities.forEach(activity => {
      if (activity.activityStatus === 'active') {
        activeTotal++
      }
    })
    return activeTotal;
  }

  calculateTotalMonthsCompleted = () => {
    const { activities } = this.props;
    let newDate = new Date();
    let month = newDate.getMonth();
    let completedTotal = 0;

    activities.forEach(activity => {
      if (activity.activityStatus === 'inactive') {
        let updatedDate = new Date(activity.updatedAt);
        let updatedMonth = updatedDate.getMonth();

        if (updatedMonth === month) {
          completedTotal++;
        }
      }
    })
    return completedTotal;
  }

  calculateActivitiesAdded = () => {
    const { activities } = this.props;
    let newDate = new Date();
    let thisMonth = newDate.getMonth();
    let totalActivities = 0;

    activities.forEach(activity => {
      let createdDate = new Date(activity.createdAt);
      let createdMonth = createdDate.getMonth();
      if (createdMonth === thisMonth) {
        totalActivities++;
      }
    })
    return totalActivities;
  }

  render() {
    const { activities } = this.props;

    return (
      <div className='dashboard'>
        <div className='total-active'>
          <div className='total-active-number'>
            {this.caculateTotalActive()}
          </div>
          <div className='total-active-title'>
            Active
          </div>
        </div>
        <div className='month-completed'>
          <div className='dashboard-image'>
            <img
              width='20px'
              height='20px'
              src={'https://image.flaticon.com/icons/svg/291/291201.svg'}
            />
          </div>
          <div className='divider'>
            |
          </div>
          <div className='month-completed-number'>
            {this.calculateTotalMonthsCompleted()}
          </div>
          <div className='total-month-completed-title'>
            Done
          </div>
        </div>
        <div className='month-created'>
          <div className='dashboard-image'>
            <img
              width='20px'
              height='20px'
              src={'https://image.flaticon.com/icons/svg/753/753254.svg'}
            />
          </div>
          <div className='divider'>
            |
          </div>
          <div className='month-created-number'>
            {this.calculateActivitiesAdded()}
          </div>
          <div className='total-month-created-title'>
            New
          </div>
        </div>
        <Summary activities={activities} />
      </div>
    )
  }
}

const mapState = state => ({
  userId: state.user.id,
  activities: state.activity.allActivities,
});

const mapDispatch = dispatch => ({
  getActivities: (id) => {
    dispatch(fetchActivities(id))
  }
});

export default connect(mapState, mapDispatch)(Dashboard)
