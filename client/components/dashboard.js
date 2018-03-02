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
          {this.caculateTotalActive()}
          <div className='active-dashboard-summary'>
            Active
          </div>
        </div>
        <div className='month-completed'>
          <div className='total-month-completed'>
            {this.calculateTotalMonthsCompleted()}
          <div>
            Completed
          </div>
        </div>
        </div>
        <div className='month-created'>
          {this.calculateActivitiesAdded()}
          <div>
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
