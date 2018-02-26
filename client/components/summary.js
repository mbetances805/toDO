import React, { Component } from 'react'
import { connect } from 'react-redux'
import LineChart from './lineChart'
import { timeParse } from 'd3-time-format'
import { fetchActivities } from '../store/activity'

class Summary extends Component {
  componentDidMount() {
    const { userId } = this.props;
    this.props.getActivities(userId)
  }
  render() {
    const generateCompletedTallyByDate = () => {
      let completedByDateObj = {};
      let parseTime = timeParse('%Y-%m-%d');
      const { activities } = this.props;

      activities.forEach(activity => {
        let updatedDateSub = activity.updatedAt.substring(0, 10);
        if (completedByDateObj[updatedDateSub]) {
          let counter = completedByDateObj[updatedDateSub];
          counter++;
          completedByDateObj[updatedDateSub] = counter;
        } else {
          completedByDateObj[updatedDateSub] = 1;
        }
      })

      let arrayOfDatesTally = (function () {
        let completedByDateArray = [];
        for (let key in completedByDateObj) {
          let formattedDate = parseTime(key)
          completedByDateArray.push({date: formattedDate, numberCompleted: completedByDateObj[key]})
        }
        return completedByDateArray
      })()

      return arrayOfDatesTally
    }


    return (
      <LineChart data={generateCompletedTallyByDate()} />
    )
  }
}

const mapState = state => ({
  userId: state.user.id,
  activities: state.activity.allActivities
});
const mapDispatch = dispatch => ({
  getActivities: (id) => {
    dispatch(fetchActivities(id))
  }
});

export default connect(mapState, mapDispatch)(Summary)
