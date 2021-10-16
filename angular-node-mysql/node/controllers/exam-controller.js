const Exam = require('../models/exam-setup-model');

exports.addExam = (req, res) => {

    Exam.create({
        company_code: req.body.company_code,
        examCode: req.body.examCode,
        examName: req.body.examName,
        examLevel: req.body.examLevel,
        examRank: req.body.examRank
    }).then(() => {
        return res.send();
    }).catch((err) => {
        res.send(err);
        console.log('Add exam Error: ', err);
    })
}

exports.getAllExam = (req, res) => {
    Exam.findAll({
        order: [
            ['examName', 'ASC'],
        ],
    }).then((exam) => {
        res.send(exam);
    }).catch((err) => {
        res.send(err);
    })
}


exports.getSingleExam = (req, res) => {
    examPk = req.params.id;
    Exam.findByPk(examPk).then(
        (exam) => {
            res.send(exam);
        }
    ).catch((err) => {
        res.send(err);
    })
}


exports.deleteExamById = async (req, res) => {
    try {
        let examId = req.params.id;
        let exam = await Exam.findByPk(examId);

        if (!exam) {
            res.status(404).json({
                message: "Does Not exist a exam with id = " + examId,
                error: "404",
                exam: []
            });
        } else {
            await Exam.destroy({
                where: {
                    id: examId
                }
            });
            res.status(200).json({
                message: "Delete Successfully a exam with id = " + examId,
                exam: [exam],
                error: ""
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a exam with id = " + req.params.id,
            error: error.message,
            exam: []
        });
    }
}


exports.editExamById = async (req, res) => {
    try {
        let Id = req.params.id;

        let exam = await Exam.findByPk(Id);

        if (!exam) {
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a exam with id = " + Id,
                exam: [],
                error: "404"
            });
        } else {
            // update new change to database
            let updatedObject = {
                examCode: req.body.examCode,
                examName: req.body.examName,
                examLevel: req.body.examLevel,
                examRank: req.body.examRank
            }
            let result = await Exam.update(
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
                    message: "Error -> Can not update a exam with id = " + req.params.id,
                    error: "Can NOT Updated",
                    exam: []
                });
            }

            res.status(200).json({
                message: "Update successfully a exam with id = " + Id,
                exam: [updatedObject],
                error: ""
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update a exam with id = " + req.params.id,
            error: error.message,
            exam: []

        });
    }
}