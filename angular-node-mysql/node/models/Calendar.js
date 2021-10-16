const Sequelize = require('sequelize')
const database = require('../database/db.js')

module.exports = database.define(
  'calendar',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING
    },
    start: {
      type: Sequelize.DATE
    },
    startdate: {
      type: Sequelize.STRING
    },
    timefrom: {
      type: Sequelize.STRING
    },
    timeto: {
      type: Sequelize.STRING
    },
    end: {
        type: Sequelize.DATE
      },
    enddate: {
      type: Sequelize.STRING
    },
    guest: {
    type: Sequelize.STRING
    },
    location: {
        type: Sequelize.STRING
      }, 
    description: {
      type: Sequelize.STRING
      },
    userid: {
    type: Sequelize.STRING
    },
    created: {
        type: Sequelize.DATE
      }, 
    all_day: {
     type: Sequelize.STRING
    }, 
    repeat_with: {
     type: Sequelize.STRING
    }, 
    meet_media: {
     type: Sequelize.STRING
    }, 
    notify_with: {
     type: Sequelize.STRING
    }, 
    notify_time: {
     type: Sequelize.STRING
    }, 
    notify_slab: {
     type: Sequelize.STRING
    }, 
    email: {
     type: Sequelize.STRING
    }, 
    busy_flag: {
     type: Sequelize.STRING
    },
    visibility: {
     type: Sequelize.STRING
    }, 
    guest_id: {
     type: Sequelize.STRING
    }, 
    modify_event: {
      type: Sequelize.STRING
      }, 
    invite_other: {
     type: Sequelize.STRING
    },
    view_guest: {
     type: Sequelize.STRING
    },
    login_date: {
     type: Sequelize.DATE
    }
  },
  {
    timestamps: false
  }
)
