const Designation = require('../models/designation-setup-model');

exports.addDesignation = (req, res) => {

    Designation.create({
        company_code: req.body.company_code,
        designationCode: req.body.designationCode,
        designationName: req.body.designationName,
        shortName:req.body.shortName,
        designationRank: req.body.designationRank
    }).then(() => {
        return res.send();
    }).catch((err) => {
        res.send(err);
        console.log('Add designation Error: ', err);
    })
}

exports.getAllDesignation = (req, res) => {
    Designation.findAll({
        order: [
            ['designationRank', 'ASC'],
        ],
    }).then((getData) => {
        res.json({isExecuted:true, data: getData});
    }).catch((err) => {
        res.send(err);
    })
}


exports.getSingleDesignation = (req, res) => {
    designationPk = req.params.id;
    Designation.findByPk(designationPk).then(
        (designation) => {
            res.send(designation);
        }
    ).catch((err) => {
        res.send(err);
    })
}


exports.deleteDesignationById = async (req, res) => {
    try {
        let designationId = req.params.id;
        let designation = await Designation.findByPk(designationId);

        if (!designation) {
            res.status(404).json({
                message: "Does Not exist a designation with id = " + designationId,
                error: "404",
                designation: []
            });
        } else {
            await Designation.destroy({
                where: {
                    id: designationId
                }
            });
            res.status(200).json({
                message: "Delete Successfully a designation with id = " + designationId,
                designation: [designation],
                error: ""
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a designation with id = " + req.params.id,
            error: error.message,
            designation: []
        });
    }
}


exports.editDesignationById = async (req, res) => {
    try {
        let Id = req.params.id;

        let designation = await Designation.findByPk(Id);

        if (!designation) {
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a designation with id = " + Id,
                designation: [],
                error: "404"
            });
        } else {
            // update new change to database
            let updatedObject = {
                designationCode: req.body.designationCode,
                designationName: req.body.designationName,
                designationRank: req.body.designationRank,
                shortName: req.body.shortName
            }
            let designation = await Designation.update(
                updatedObject, {
                    returning: true,
                    where: {
                        id: Id
                    }
                }
            );

            // return the response to client
            if (!designation) {
                res.status(500).json({
                    message: "Error -> Can not update a designation with id = " + req.params.id,
                    error: "Can NOT Updated",
                    designation: []
                });
            }

            res.status(200).json({
                message: "Update successfully a designation with id = " + Id,
                designation: [updatedObject],
                error: ""
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update a designation with id = " + req.params.id,
            error: error.message,
            designation: []

        });
    }
}