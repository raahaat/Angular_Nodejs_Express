const Sequelize = require('sequelize')
const database = require('../database/db.js')

module.exports = database.define(
  'pylevdtl',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    pycomcde: { type: Sequelize.STRING },
    pyempcde: { type: Sequelize.STRING },    
    // pylevtyp: { type: Sequelize.STRING },
    pylevcde: { type: Sequelize.STRING },
    pyappdte: { type: Sequelize.DATE },
    pyfrmdte: { type: Sequelize.DATE },
    pyenddte: { type: Sequelize.DATE }, 
    pypurpos: { type: Sequelize.STRING },
    // pylevsts: { type: Sequelize.STRING },
    py001flg: { type: Sequelize.STRING },
    // py001dte: { type: Sequelize.DATE },
    // pyrep001: { type: Sequelize.STRING },
    // pyrepflg: { type: Sequelize.STRING },
    // pyrep002: { type: Sequelize.STRING },
    // pysubhed: { type: Sequelize.STRING },
    // pysubflg: { type: Sequelize.STRING },
    // pysubdte: { type: Sequelize.DATE },
    // pydephed: { type: Sequelize.STRING },
    // pydepflg: { type: Sequelize.STRING },
    // pydepdte: { type: Sequelize.DATE },
    // pyfrnflg: { type: Sequelize.STRING },
    // pyostamp: { type: Sequelize.STRING },
    // pytstamp: { type: Sequelize.DATE },
    
  },
  { timestamps: false, freezeTableName: true }
)
