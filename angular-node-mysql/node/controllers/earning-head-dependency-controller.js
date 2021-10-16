const HeadDependency = require('../models/earning-head-dependency-setup-model');

exports.addHeadDependency = (req, res) => {

    HeadDependency.create({
        company_code: req.body.company_code,
        dependsOnHead: req.body.dependsOnHead,
        dependentHead: req.body.dependentHead,
        percentage: req.body.percentage,
        insert_by: req.body.insert_by
    }).then(() => {
        return res.send();
    }).catch((err) => {
        res.send(err);
        console.log('Add headDependency Error: ', err);
    })
}

exports.getAllHeadDependency = async (req, res) => {
    HeadDependency.findAll(  
        {  
        where: {company_code: '200'},
        order: [['dependsOnHead', 'ASC']]
        }
    )
      .then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
      })
};

exports.getSingleHeadDependency = (req, res) => {
    headDependencyPk = req.params.id;
    HeadDependency.findByPk(headDependencyPk).then(
        (headDependency) => {
            res.send(headDependency);
        }
    ).catch((err) => {
        res.send(err);
    })
}


exports.deleteHeadDependencyById = async (req, res) => {
    try {
        let headDependencyId = req.params.id;
        let headDependency = await HeadDependency.findByPk(headDependencyId);

        if (!headDependency) {
            res.status(404).json({
                message: "Does Not exist a headDependency with id = " + headDependencyId,
                error: "404",
                headDependency: []
            });
        } else {
            await HeadDependency.destroy({
                where: {
                    id: headDependencyId
                }
            });
            res.status(200).json({
                message: "Delete Successfully a headDependency with id = " + headDependencyId,
                headDependency: [headDependency],
                error: ""
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a headDependency with id = " + req.params.id,
            error: error.message,
            headDependency: []
        });
    }
}


exports.editHeadDependencyById = async (req, res) => {
    try {
        let Id = req.params.id;

        let headDependency = await HeadDependency.findByPk(Id);

        if (!headDependency) {
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a headDependency with id = " + Id,
                headDependency: [],
                error: "404"
            });
        } else {
            // update new change to database
            let updatedObject = {
                dependsOnHead: req.body.dependsOnHead,
                dependentHead: req.body.dependentHead,
                percentage: req.body.percentage
            }
            let headDependency = await HeadDependency.update(
                updatedObject, {
                    returning: true,
                    where: {
                        id: Id
                    }
                }
            );

            // return the response to client
            if (!headDependency) {
                res.status(500).json({
                    message: "Error -> Can not update a headDependency with id = " + req.params.id,
                    error: "Can NOT Updated",
                    headDependency: []
                });
            }

            res.status(200).json({
                message: "Update successfully a headDependency with id = " + Id,
                headDependency: [updatedObject],
                error: ""
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update a headDependency with id = " + req.params.id,
            error: error.message,
            headDependency: []

        });
    }
}