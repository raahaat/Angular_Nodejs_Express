const Result = require('../models/result-grade-setup-model');

exports.addResult = (req, res) => {

    Result.create({
        company_code: req.body.company_code,
        resultCode: req.body.resultCode,
        resultName: req.body.resultName,
        resultRank: req.body.resultRank
    }).then(() => {
        return res.send();
    }).catch((err) => {
        res.send(err);
        console.log('Add result Error: ', err);
    })
}

exports.getAllResult = (req, res) => {
    Result.findAll({
        order: [
            ['resultRank', 'ASC'],
        ],
    }).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    })
}


exports.getSingleResult = (req, res) => {
    resultPk = req.params.id;
    Result.findByPk(resultPk).then(
        (result) => {
            res.send(result);
        }
    ).catch((err) => {
        res.send(err);
    })
}


exports.deleteResultById = async (req, res) => {
    try {
        let resultId = req.params.id;
        let result = await Result.findByPk(resultId);

        if (!result) {
            res.status(404).json({
                message: "Does Not exist a result with id = " + resultId,
                error: "404",
                result: []
            });
        } else {
            await Result.destroy({
                where: {
                    id: resultId
                }
            });
            res.status(200).json({
                message: "Delete Successfully a result with id = " + resultId,
                result: [result],
                error: ""
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a result with id = " + req.params.id,
            error: error.message,
            result: []
        });
    }
}


exports.editResultById = async (req, res) => {
    try {
        let Id = req.params.id;

        let result = await Result.findByPk(Id);

        if (!result) {
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a result with id = " + Id,
                result: [],
                error: "404"
            });
        } else {
            // update new change to database
            let updatedObject = {
                resultCode: req.body.resultCode,
                resultName: req.body.resultName,
                resultRank: req.body.resultRank
            }
            let result = await Result.update(
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
                    message: "Error -> Can not update a result with id = " + req.params.id,
                    error: "Can NOT Updated",
                    result: []
                });
            }

            res.status(200).json({
                message: "Update successfully a result with id = " + Id,
                result: [updatedObject],
                error: ""
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update a result with id = " + req.params.id,
            error: error.message,
            result: []

        });
    }
}