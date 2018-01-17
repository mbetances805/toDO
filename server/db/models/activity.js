const Sequelize = require ('sequelize');
const db = require ('../db');

const Activity = db.define('activity', {
  activityDescription: {
    type: Sequelize.TEXT
  },
  startTime: {
    type: Sequelize.DATE
  },
  endTime: {
    type: Sequelize.DATE
  }
})

module.exports = Activity