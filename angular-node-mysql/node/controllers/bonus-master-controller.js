const Bmaster = require('../models/bonus-master-setup-model');
const BmasterDetails = require('../models/bonus-master-details');
const desig = require('../models/designation-setup-model');
const earn_deduct_code = require('../models/Earn-deduct-code');
const sequelize = require('../database/db');
const { QueryTypes } = require('sequelize');
const { BIND_IN } = require('oracledb');



exports.getAllBmaster = (req, res) => {
   
    sequelize.query("SELECT cbms.id, "+
    "cbms.company_code, "+
    "cbms.bonus_serial_no, "+
    "cbms.percentage_of_pay, "+
    "cbms.emp_type, "+
    "cbms.emp_join_type, "+
    "cbms.effective_date, "+
    "IFNULL(cd.designationName,'ALL') designation_name, "+
    "cbt.btypeName, "+ 
    "ccm.description category_name "+
    "from  con_bonus_master_setup cbms LEFT JOIN con_designations cd ON cbms.designation=cd.designationCode  LEFT JOIN con_bonus_type cbt ON cbms.bonus_type_code=cbt.btypeCode LEFT JOIN con_code_master ccm ON cbms.category_code=ccm.code",
     { type: QueryTypes.SELECT }).then((getData) =>{
        console.log("result",getData);
        res.json({isExecuted:true, data: getData});
        res.end();
     });

}

exports.editBmaster= (req, res) => {
    id = req.params.id;
    // earn_deduct_code.hasOne(BmasterDetails,{foreignKey:'earning_code', targetKey:'earn_deduct_code' });
    BmasterDetails.belongsTo(earn_deduct_code,{ foreignKey:'earning_code',targetKey:'earn_deduct_code'});
    Bmaster.findByPk(id).then(
        (setupData) => {
            BmasterDetails.findAll({ where: {bonus_serial_no: setupData.bonus_serial_no},include:[{model: earn_deduct_code, attributes:['description']}]}).then(
                    (data) =>{
                        detailData = data.map(item=>({
                            "id": item.id,
                            "bonus_serial_no": item.bonus_serial_no,
                            "earning_code": item.earning_code,
                            "earn_percentage": item.earn_percentage,
                            'name':item.earning_deduction_code.description}));
                        res.send({isExecuted:true , data: setupData,detail:detailData});   
                    }
                ).catch((err)=>{
                    res.send(err);
                });
            
        }
    ).catch((err) => {
        res.send(err);
    });
    // 
    // res.json({isExecuted:true , data: id});
}



exports.getBonusSerial= (req, res) => {
    Bmaster.findAll({
        attributes: [ [sequelize.fn('max', sequelize.col('bonus_serial_no')), 'bonus_serial_no'] ],
    }).then((getData) => {
        res.json({isExecuted:true, data: getData});
        res.end();
    }).catch((err) => {
        res.send(err);
    })
}

exports.getCategory = (req, res) => {
    const users =  sequelize.query("SELECT code, description FROM `con_code_master` where hard_code='CT' ",
     { type: QueryTypes.SELECT }).then((getData) =>{
        res.json({isExecuted:true, data: getData});
        res.end();
     });
}



exports.getEarning = (req, res) => {
    id = req.params.id;
    console.log("earning ",id);
    const users =  sequelize.query(`SELECT cdss.earning_code , edc.description FROM con_desig_salary_setup cdss, earning_deduction_code edc where cdss.designation= '${id}' AND cdss.earning_code=edc.earn_deduct_code `,
     { type: QueryTypes.SELECT }).then((getData) =>{
        res.json({isExecuted:true, data: getData});
        res.end();
     });
}

exports.getEarningAll = (req, res) => {
    const users =  sequelize.query(`SELECT DISTINCT(cdss.earning_code), edc.description FROM con_desig_salary_setup cdss, earning_deduction_code edc where  cdss.earning_code=edc.earn_deduct_code `,
     { type: QueryTypes.SELECT }).then((getData) =>{
        res.json({isExecuted:true, data: getData});
        res.end();
     });
}

exports.addBonusMaster = async (req, res) => {
    console.log("inserting");
    details = req.body.details;
    setup = req.body.setup;
    
    await Bmaster.create(setup)
    .then((data)=> {
    //   res.json({message : 'Successfully inserted.'});
    //   res.end();
    }).catch((err)=> {
        console.log('Error',err);
    });

    await BmasterDetails.bulkCreate(details)
    .then((data)=> {
        res.json({message : 'Successfully inserted.'});
        res.end();
      }).catch((err)=> {
          console.log('Error',err);
      });


}


exports.updateBmaster = async (req, res) => {
    setup = req.body.setup;
    details = req.body.details;
    deleteData= req.body.delete;
    await Bmaster.update(setup,{where: {id: setup.id}},)
    .catch((err)=> {
        console.log('Error',err);
    });

    newData = details.filter(item => item.id == undefined);
    
    // 
    await BmasterDetails.destroy({where: {id: deleteData}}).catch((err)=> {
        console.log('Error',err);
    });
    await BmasterDetails.bulkCreate(newData)
    .then((data)=> {
        res.json({message : 'Successfully inserteds.'});
        res.end();
      }).catch((err)=> {
          console.log('Error',err);
      });

}

exports.deleteBmaster= async (req, res) => {
    id = req.params.id;
    await Bmaster.findByPk(id,{attributes:['bonus_serial_no']}).then( 
        async (data)=>{
            await BmasterDetails.destroy({where: {id: data.bonus_serial_no}}).catch((err)=> {
                console.log('Error',err);
            });
            await Bmaster.destroy({where: {id: id}})
            // .then(()=> )
            .catch((err)=> {
                console.log('Error',err);
            });
            res.json({message : 'Successfully deleted.'})
            
        } );
    
}