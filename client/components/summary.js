import React, { Component } from 'react'
import { connect } from 'react-redux'
import LineChart from './lineChart'
import { timeParse } from 'd3-time-format'

class Summary extends Component {
  render() {
    const generateCompletedTallyByDate = () => {
      let completedByDateObj = {};
      let parseTime = timeParse('%Y-%m-%d');
      const { activities } = this.props;

      activities.forEach(activity => {
        if (activity.activityStatus === 'inactive'){
          let updatedDateSub = activity.updatedAt.substring(0, 10);
          if (completedByDateObj[updatedDateSub]) {
            let counter = completedByDateObj[updatedDateSub];
            counter++;
            completedByDateObj[updatedDateSub] = counter;
          } else {
            completedByDateObj[updatedDateSub] = 1;
          }
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
      <LineChart className="line-chart" data={generateCompletedTallyByDate()} />
    )
  }
}

const mapState = null;

const mapDispatch = null;

export default connect(mapState, mapDispatch)(Summary)
