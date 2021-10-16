const contactListModel = require('../models/home-contact-info');

exports.getContactList = async (req, res) => {
    contactListModel.findAll(
        { where: {employee_code: req.params.id}}
    )
      .then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
    })
};