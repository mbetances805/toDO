const Sequelize = require('sequelize');
const db = require('../db');

const Activity = db.define('activity', {
  activityDescription: {
    type: Sequelize.TEXT
  },
  activityDate: {
    type: Sequelize.DATE
  },
  activityStatus: {
    type: Sequelize.ENUM('active', 'inactive')
  }
})

module.exports = Activity
