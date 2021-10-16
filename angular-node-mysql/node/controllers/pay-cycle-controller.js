const Paycycle = require('../models/pay-cycle-setup-model');

exports.addPaycycle = (req, res) => {
    
    Paycycle.create({
        company_code:req.body.company_code, 
        currentMonth: req.body.currentMonth,
        currentYear: req.body.currentYear,
        paycycleNum: req.body.paycycleNum,
        attendanceFrom: req.body.attendanceFrom,
        attendanceTo: req.body.attendanceTo,
        category: req.body.category,
        workingHours: req.body.workingHours,
        monthStatus: req.body.monthStatus
    }).then(() => {
        console.log("then add:", console.log(req.body));
        return res.send();
    }).catch((err) => {
        console.log('err', err)
        res.send(err);
        console.log("error add:", console.log(req.body));
    })
}

exports.getAllPaycycle = (req, res) => {
    Paycycle.findAll({
        order: [
            ['paycycleNum', 'ASC'],
        ],
    }).then((paycycle) => {
        res.send(paycycle);
    }).catch((err) => {
        res.send(err);
    })
}


exports.getSinglePaycycle = (req, res) => {
    paycyclePk = req.params.id;
    Paycycle.findByPk(paycyclePk).then(
        (paycycle) => {
            res.send(paycycle);
        }
    ).catch((err) => {
        res.send(err);
    })
}


exports.deletePaycycleById = async (req, res) => {
    try {
        let paycycleId = req.params.id;
        let paycycle = await Paycycle.findByPk(paycycleId);

        if (!paycycle) {
            res.status(404).json({
                message: "Does Not exist a paycycle with id = " + paycycleId,
                error: "404",
                paycycle: []
            });
        } else {
            await Paycycle.destroy({
                where: {
                    id: paycycleId
                }
            });
            res.status(200).json({
                message: "Delete Successfully a paycycle with id = " + paycycleId,
                paycycle: [paycycle],
                error: ""
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a paycycle with id = " + req.params.id,
            error: error.message,
            paycycle: []
        });
    }
}


exports.editPaycycleById = async (req, res) => {
    try {
        let Id = req.params.id;
        let paycycle = await Paycycle.findByPk(Id);

        if (!paycycle) {
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a paycycle with id = " + Id,
                paycycle: [],
                error: "404"
            });
        } else {
            // update new change to database
            let updatedObject = {
                company_code: req.body.company_code,
                currentMonth: req.body.curentMonth,
                currentYear: req.body.currentYear,
                paycycleNum: req.body.paycycleNum,
                attendanceFrom: req.body.attendanceFrom,
                attendanceTo: req.body.attendanceTo,
                category: req.body.category,
                update_date: new Date(Date.now()).toISOString(),
                workingHours: req.body.workingHours,
                monthStatus: req.body.monthStatus

            }
            let result = await Paycycle.update(
                updatedObject, {
                    returning: true,
                    where: {
                        id: Id
                    }
                }
            );

            // return the response to client
            if (!result) {

                res.status(500).json({
                    message: "Error -> Can not update a paycycle with id = " + req.params.id,
                    error: "Can NOT Updated",
                    paycycle: []
                });
            }

            res.status(200).json({
                message: "Update successfully a paycycle with id = " + Id,
                paycycle: [updatedObject],
                error: ""
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Error -> Can not update a paycycle with id = " + req.params.id,
            error: error.message,
            paycycle: []
        });
    }
}


exports.getPayCycleLatest = async (req, res) => {
    let companyCode = '200';

    Paycycle.findAll({          
        where: {
          company_code: companyCode,
          monthStatus: 'N'
        },
        order: [
          ['currentYear', 'DESC'],
          ['currentMonth', 'DESC'],
          ['payCycleNum', 'ASC'],
        ]
    })
    .then(getData => {
        res.json({isExecuted:true, data: getData, message: "Data fetched successfully."});
        res.end();
    })
    .catch(err => {
        res.json({isExecuted:false, message: "Error to get data."});
        res.end();
    });
};


exports.getPayCycleAll = async (req, res) => {
    let companyCode = '200';

    Paycycle.findAll({          
        where: {
          company_code: companyCode,
        },
        order: [
          ['currentYear', 'DESC'],
          ['currentMonth', 'DESC'],
          ['payCycleNum', 'ASC'],
        ]
    })
    .then(getData => {
        res.json({isExecuted:true, data: getData, message: "Data fetched successfully."});
        res.end();
    })
    .catch(err => {
        res.json({isExecuted:false, message: "Error to get data."});
        res.end();
    });
};


exports.getPayCycleById = async (req, res) => {
    let editId = req.params.id;
    
    Paycycle.findOne(
        { where: {id: editId}}
      )
    .then(editData => {
      res.json({isExecuted:true, data: editData, message: "Data fetched successfully."});
      res.end();
      })
    .catch(err => {
      res.json({isExecuted:false, message: "Error to get data."});
      res.end();
    });
};



exports.updatePayCycle = async (req, res) => {
    let updatedId = req.params.id;

    Paycycle.update({
      // id          : req.body.id,
        currentMonth    : req.body.currentMonth,
        currentYear     : req.body.currentYear,
        paycycleNum     : req.body.paycycleNum,
        category        : req.body.category,
        attendanceFrom  : req.body.attendanceFrom,
        attendanceTo    : req.body.attendanceTo,
        salaryProcessDate: req.body.salaryProcessDate,
        payCycleDesc    : req.body.payCycleDesc,        
        totalDays       : req.body.totalDays,
        workingDays     : req.body.workingDays,
        workingHours    : req.body.workingHours,
        totalWorkingHour: req.body.totalWorkingHour,
        payStatus       : req.body.payStatus,
        payStartDate    : req.body.payStartDate,
        payEndDate      : req.body.payEndDate,
        postFlag        : req.body.postFlag,
        glPostingStart  : req.body.glPostingStart,
        glPostingEnd    : req.body.glPostingEnd,
        monthStatus     : req.body.monthStatus,
        extFlag         : req.body.extFlag,
        update_by       : req.body.update_by,
        update_date     : req.body.update_date 
    }, {where: {id: updatedId}}
    )

    .then((updated)=> {
      res.json({isExecuted:true, data: updated, message:"Successfully Updated Data For: " + updatedId});
      res.end();
    })
    .catch (err => {
      res.json({isExecuted:false, message:"Unknown Error: "+ err});
      res.end();
    })
};
