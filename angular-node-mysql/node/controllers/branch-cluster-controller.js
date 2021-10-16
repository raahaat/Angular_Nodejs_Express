
const branchClusterModel = require('../models/con-branch-cluster');
const branchModel = require('../models/branch-master-setup');



exports.addBranchCluster = async (req, res) => {
   
    console.log(req.body.times);
    for(let val of req.body.times) { 
 
        const formData = {
            company_code    : req.body.company_code,
            cluster_code    : req.body.cluster_code,
            cluster_name    : req.body.cluster_name,
            cluster_head    : req.body.cluster_head,
            branch_code     : val.branch_code,
            insert_by       : val.insert_by,
            insert_date     : val.insert_date 
        };

    if (val) {
        branchClusterModel.create(formData)
        .then((data)=> {
        res.json({message : 'Successfully inserted.'});
        res.end();
        }).catch((err)=> {
            console.log('error');
        })
    }
        
    } //loop end
};


exports.getBranchList = async (req, res) => {
    branchModel.findAll({
        attributes: ['branch_code', 'branch_name']
        // ,
        // where: {company_code: '200'}
    })
    .then(getData => {  
        res.json({isExecuted:true, data: getData});
        res.end();     
    })
};