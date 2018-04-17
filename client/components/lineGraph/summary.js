import React, { Component } from 'react'
import { connect } from 'react-redux'
import LineChart from './lineChart'
import { timeParse } from 'd3-time-format'

class LineSummary extends Component {
  render() {
    // need to optimize this function
    const generateTally = () => {
      let completedByDateObj = {};
      let createdByDateObj = {};
      let parseTime = timeParse('%Y-%m');
      const { activities } = this.props;

      activities.forEach(activity => {
        if (activity.activityStatus === 'inactive'){
          let updatedDateSub = activity.updatedAt.substring(0, 7);
          if (completedByDateObj[updatedDateSub]) {
            let counter = completedByDateObj[updatedDateSub];
            counter++;
            completedByDateObj[updatedDateSub] = counter;
          } else {
            completedByDateObj[updatedDateSub] = 1;
          }
        }

        let createdDateSub = activity.createdAt.substring(0, 7);
        if (createdByDateObj[createdDateSub]) {
          let counter = createdByDateObj[createdDateSub];
          counter++;
          createdByDateObj[createdDateSub] = counter;
        } else {
          createdByDateObj[createdDateSub] = 1;
        }
      })

      let arrayOfDatesTally = (function () {
        let completedByDateArray = [];
        let createdByDateArray = [];
        for (let key in completedByDateObj) {
          let formattedDate = parseTime(key);
          completedByDateArray.push({date: formattedDate, tally: completedByDateObj[key]})
        }
        for (let key in createdByDateObj) {
          let formattedDate = parseTime(key);
          createdByDateArray.push({date: formattedDate, tally: createdByDateObj[key]})
        }

        let tallyArray = [completedByDateArray, createdByDateArray];
        return tallyArray
      })()

      return arrayOfDatesTally
    }


    return (
      <LineChart className="line-chart" data={generateTally()} />
    )
  }
}

const mapState = null;

const mapDispatch = null;

export default connect(mapState, mapDispatch)(LineSummary)
