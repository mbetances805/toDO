import React, { Component } from 'react'
import { connect } from 'react-redux'
import LineSummary from './lineGraph/summary'
import BarSummary from './barGraph/summary'
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
        let updatedDate = new Date(activity.updatedAt.slice(0, -1));
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

  determineDayMonth = (value, type) => {
    let days = {0: 'Sunday', 1: 'Monday', 2: 'Tuesday', 3: 'Wednesday',
      4: 'Thursday', 5: 'Friday', 6: 'Saturday'}

    let months = {0: 'January', 1: 'February', 2: 'March', 3: 'April',
      4: 'May', 5: 'June', 6: 'July', 7: 'August', 8: 'September',
      9: 'October', 10: 'November', 11: 'December'}

    if (type === 'day') {
      return days[value]
    } else if (type === 'month') {
      return months[value]
    }
  }

  calculateAddedPerDay = () => {
    const { activities } = this.props
    let dayCount = {}
    let totalCount = 0
    activities.forEach(activity => {
      let createdDate = new Date(activity.createdAt)
      let dayNum = createdDate.getDay()
      let dayStr = this.determineDayMonth(dayNum, 'day')
      if (!dayCount[dayStr]) {
        dayCount[dayStr] = 1
      } else {
        let counter = dayCount[dayStr]
        counter++
        dayCount[dayStr] = counter
      }
      totalCount++
    })
    if (totalCount !== activities.length) {
      return new Error('Total count by day is not equal to the total count of activites')
    }
    return dayCount
  }

  render() {
    const today = new Date()
    const month = today.getMonth()
    const currentMonth = this.determineDayMonth(month, 'month')
    const { activities } = this.props;
    return (
      <div className='dashboard'>
        <div id='month-summary-container'>
          <div id='current-month-header'>{`${currentMonth}'s Summary`}</div>
          <div className='total-active'>
            <div className='total-active-number'>
              {this.caculateTotalActive()}
            </div>
            <div className='total-active-title'>
              Active
            </div>
          </div>
          <div className='month-completed'>
            <div className='month-completed-number'>
              {this.calculateTotalMonthsCompleted()}
            </div>
            <div className='total-month-completed-title'>
              Completed
            </div>
          </div>
          <div className='month-created'>
            <div className='month-created-number'>
              {this.calculateActivitiesAdded()}
            </div>
            <div className='total-month-created-title'>
              New
            </div>
          </div>
        </div>
        <LineSummary activities={activities} />
        {/*<div id='overall-summary-container'>
          <div id='overall-summary-header'>Overall Summary</div>
          <BarSummary activities={activities} data={this.calculateAddedPerDay()} />
        </div>*/}
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
