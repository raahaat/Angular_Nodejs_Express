const empCurrentSalary = require("../models/cor-emp-current-salary");
const empMaster = require("../models/cor-employee-master");
const earningHeadSetup = require("../models/earning-head-setup-model");
const designation = require("../models/designation-setup-model");
const branch = require("../models/branch-master-setup");
const sequelize = require("../database/db");
const { QueryTypes } = require("sequelize");
const { BIND_IN } = require("oracledb");

exports.process = async (req, res) => {
  id = req.params.id;
  empCurrentSalary.belongsTo(empMaster, {
    foreignKey: "employee_code",
    targetKey: "employee_code",
  });
  empMaster.belongsTo(designation, {
    foreignKey: "designation",
    targetKey: "designationCode",
  });
  empMaster.belongsTo(branch, {
    foreignKey: "branch",
    targetKey: "branch_code",
  });

  await empCurrentSalary
    .findAll({
      attributes: ["employee_code", "amount"],
      where: { salary_head:'ER000' },
    })
    .then(async (data) => {
        await empMaster.findOne({attributes:['employee_name','designation','branch'],where:{employee_code:id},include:[{model: designation, attributes:['designationName']},{model: branch, attributes:['branch_name']}]})
        .then(getData  =>{
            // all_data ={
            //     'employee_name':getData.employee_name,
            //     'designation': getData.designation,
            //     'branch': getData.branch,
            //     'designation_name': getData.con_designation.designationName,
            //     'branch_name': getData.con_com_branchmaster.branch_name
            // };
            // console.log("result",all_data);
            res.json({isExecuted:true, data: data,pata: getData});
            res.end();
        });
    });

  console.log(req.params.id);
  res.json({ isExecuted: true, data: req.params.id });
  res.end();
};
