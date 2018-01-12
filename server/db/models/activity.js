const Sequelize = require ('sequelize');
const db = require ('../db');

const Activity = db.define('activity', {
  activityName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  activityDescription: {
    type: Sequelize.TEXT
  },
  startTime: {
    type: Sequelize.DATE
  },
  endTime: {
    type: Sequelize.DATE
  },
  complexity: {
    type: Sequelize.ENUM('Easy', 'Moderate', 'Hard')
  }
})

module.exports = Activity