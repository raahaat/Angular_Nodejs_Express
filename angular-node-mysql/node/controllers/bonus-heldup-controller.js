const Bheldup = require('../models/bonus-heldup-setup-model');

exports.addBheldup = (req, res) => {

    Bheldup.create({
        company_code: req.body.company_code,
        employeeId: req.body.employeeId,
        status: req.body.status,
        effectiveDate: req.body.effectiveDate,
        expireDate: req.body.expireDate,
        insert_by: req.body.insert_by,
        insert_date: req.body.insert_dte
    }).then(() => {
        return res.send();
    }).catch((err) => {
        res.send(err);
        console.log('Add bonus heldup Error: ', err);
    })
}

exports.getAllBheldup = (req, res) => {
    Bheldup.findAll({
        order: [
            ['effectiveDate', 'ASC'],
        ],
    }).then((bheldup) => {
        res.send(bheldup);
    }).catch((err) => {
        res.send(err);
    })
}


exports.getSingleBheldup = (req, res) => {
    bheldupPk = req.params.id;
    Bheldup.findByPk(bheldupPk).then(
        (bheldup) => {
            res.send(bheldup);
        }
    ).catch((err) => {
        res.send(err);
    })
}


exports.deleteBheldupById = async (req, res) => {
    try {
        let bheldupId = req.params.id;
        let bheldup = await Bheldup.findByPk(bheldupId);

        if (!bheldup) {
            res.status(404).json({
                message: "Does Not exist a bonus heldup with id = " + bheldupId,
                error: "404",
                bheldup: []
            });
        } else {
            await Bheldup.destroy({
                where: {
                    id: bheldupId
                }
            });
            res.status(200).json({
                message: "Delete Successfully a bonus heldup with id = " + bheldupId,
                bheldup: [bheldup],
                error: ""
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a bonus heldup with id = " + req.params.id,
            error: error.message,
            bheldup: []
        });
    }
}


exports.editBheldupById = async (req, res) => {
    try {
        let Id = req.params.id;

        let bheldup = await Bheldup.findByPk(Id);

        if (!bheldup) {
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating  bonus heldup with id = " + Id,
                bheldup: [],
                error: "404"
            });
        } else {
            // update new change to database
            let updatedObject = {
                employeeId: req.body.employeeId,
                status: req.body.status,
                effectiveDate: req.body.effectiveDate,
                expireDate: req.body.expireDate
            }
            let bheldup = await Bheldup.update(
                updatedObject, {
                    returning: true,
                    where: {
                        id: Id
                    }
                }
            );

            // return the response to client
            if (!bheldup) {
                res.status(500).json({
                    message: "Error -> Can not update a bonus heldup with id = " + req.params.id,
                    error: "Can NOT Updated",
                    bheldup: []
                });
            }

            res.status(200).json({
                message: "Update successfully a bonus heldup with id = " + Id,
                bheldup: [updatedObject],
                error: ""
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update a bonus heldup with id = " + req.params.id,
            error: error.message,
            bheldup: []

        });
    }
}