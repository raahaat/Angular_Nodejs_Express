const eventListModel = require('../models/home-event-info');

exports.getEventList = async (req, res) => {
    eventListModel.findAll(
       // { where: {employee_code: req.params.id}}
    )
      .then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
    })
};
