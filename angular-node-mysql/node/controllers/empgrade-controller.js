const Grade = require('../models/emp-grade-setup-model');

exports.addGrade = (req, res) => {

    Grade.create({
        company_code: req.body.company_code,
        gradeCode: req.body.gradeCode,
        gradeName: req.body.gradeName
    }).then(() => {
        return res.send();
    }).catch((err) => {
        res.send(err);
        console.log('Add grade Error: ', err);
    })
}

exports.getAllGrade = (req, res) => {
    Grade.findAll({
        order: [
            ['gradeName', 'ASC'],
        ],
    }).then((grade) => {
        res.send(grade);
    }).catch((err) => {
        res.send(err);
    })
}


exports.getSingleGrade = (req, res) => {
    gradePk = req.params.id;
    Grade.findByPk(gradePk).then(
        (grade) => {
            res.send(grade);
        }
    ).catch((err) => {
        res.send(err);
    })
}


exports.deleteGradeById = async (req, res) => {
    try {
        let gradeId = req.params.id;
        let grade = await Grade.findByPk(gradeId);

        if (!grade) {
            res.status(404).json({
                message: "Does Not exist a grade with id = " + gradeId,
                error: "404",
                grade: []
            });
        } else {
            await Grade.destroy({
                where: {
                    id: gradeId
                }
            });
            res.status(200).json({
                message: "Delete Successfully a grade with id = " + gradeId,
                grade: [grade],
                error: ""
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a grade with id = " + req.params.id,
            error: error.message,
            grade: []
        });
    }
}


exports.editGradeById = async (req, res) => {
    try {
        let Id = req.params.id;

        let grade = await Grade.findByPk(Id);

        if (!grade) {
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a grade with id = " + Id,
                grade: [],
                error: "404"
            });
        } else {
            // update new change to database
            let updatedObject = {
                gradeCode: req.body.gradeCode,
                gradeName: req.body.gradeName
            }
            let result = await Grade.update(
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
                    message: "Error -> Can not update a grade with id = " + req.params.id,
                    error: "Can NOT Updated",
                    grade: []
                });
            }

            res.status(200).json({
                message: "Update successfully a grade with id = " + Id,
                grade: [updatedObject],
                error: ""
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update a grade with id = " + req.params.id,
            error: error.message,
            grade: []

        });
    }
}