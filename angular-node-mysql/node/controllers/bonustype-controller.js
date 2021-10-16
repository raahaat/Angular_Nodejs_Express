const Btype = require('../models/bonus-type-setup-model');

exports.addBtype = (req, res) => {

    Btype.create({
        company_code: req.body.company_code,
        btypeCode: req.body.btypeCode,
        btypeName: req.body.btypeName
    }).then(() => {
        return res.send();
    }).catch((err) => {
        res.send(err);
        console.log('Add bonus type Error: ', err);
    })
}

exports.getBonusTypeAll = async (req, res) => {
    Btype.findAll()
      .then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
      })
};

exports.getSingleBtype = (req, res) => {
    btypePk = req.params.id;
    Btype.findByPk(btypePk).then(
        (btype) => {
            res.send(btype);
        }
    ).catch((err) => {
        res.send(err);
    })
}


exports.deleteBtypeById = async (req, res) => {
    try {
        let btypeId = req.params.id;
        let btype = await Btype.findByPk(btypeId);

        if (!btype) {
            res.status(404).json({
                message: "Does Not exist a bonus type with id = " + btypeId,
                error: "404",
                btype: []
            });
        } else {
            await Btype.destroy({
                where: {
                    id: btypeId
                }
            });
            res.status(200).json({
                message: "Delete Successfully a bonus type with id = " + btypeId,
                btype: [btype],
                error: ""
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a bonus type with id = " + req.params.id,
            error: error.message,
            btype: []
        });
    }
}


exports.editBtypeById = async (req, res) => {
    try {
        let Id = req.params.id;

        let btype = await Btype.findByPk(Id);

        if (!btype) {
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a bonus type with id = " + Id,
                btype: [],
                error: "404"
            });
        } else {
            // update new change to database
            let updatedObject = {
                btypeCode: req.body.btypeCode,
                btypeName: req.body.btypeName
            }
            let btype = await Btype.update(
                updatedObject, {
                    returning: true,
                    where: {
                        id: Id
                    }
                }
            );

            // return the response to client
            if (!btype) {
                res.status(500).json({
                    message: "Error -> Can not update a bonus type with id = " + req.params.id,
                    error: "Can NOT Updated",
                    btype: []
                });
            }

            res.status(200).json({
                message: "Update successfully a bonus type with id = " + Id,
                btype: [updatedObject],
                error: ""
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update a bonus type with id = " + req.params.id,
            error: error.message,
            btype: []

        });
    }
}