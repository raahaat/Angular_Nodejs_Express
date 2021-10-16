const empGroupDefine = require('../models/con-cor-emp-group');
const departmentModel = require('../models/con-department');

exports.addEmpGroup = async (req, res) => {
    
    for(let val of req.body.divArray) { 
        const formData = {
            company_code    : req.body.company_code,
            assign_name     : req.body.assign_name,
            assign_type     : req.body.assign_type,
            assign_code     : req.body.assign_code,
            group_type      : req.body.group_type, 
            employee_code   : req.body.employee_code,
            serial          : val.serial, 
            division        : val.division,
            insert_by       : req.body.insert_by,
            insert_date     : req.body.insert_date
        };

    if (val) {
        empGroupDefine.create(formData)
        .then((data)=> {
        res.json({isExecuted: true, message : 'Data Successfully inserted.'});
        res.end();
        }).catch((err)=> {
            console.log('error');
            res.json({isExecuted: false, message : err});
            res.end();
        })
    }     
  } //loop end
};


exports.getDepartmentList = async (req, res) => {
    departmentModel.findAll({
        attributes: ['hard_code', 'soft_code','description'],
        where: {company_code: '200'}
    })
    .then(getData => { 
        empGroupDefine.max('assign_code').then(maximumVal => {
           if (maximumVal !== 0) {
            const maxValue = 'HT' + ((Number(maximumVal.substr(2))+1).toString()).padStart(3, '0');
            res.json({isExecuted:true, data: getData, maxData: maxValue});
            res.end();    
          } else {
            const maxValue = 'HT' + (Number(1).toString()).padStart(3, '0');
            res.json({isExecuted:true, data: getData, maxData: maxValue});
            res.end();   
          }
        }).catch((err)=> {
            res.send(err);
        })     
    })
};