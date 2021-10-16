const Bank = require('../models/bank-setup-model');

exports.addBank = (req, res) => {
    Bank.create({
        company_code: req.body.company_code,
        bankCode: req.body.bankCode,
        bankName: req.body.bankName
    }).then(() => {
        return res.send();
    }).catch((err) => {
        res.send(err);
        console.log('Add bank Error: ', err);
    })
}

exports.getAllBank = async (req, res) => {
    Bank.findAll()
      .then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
      })
};

exports.getSingleBank = (req, res) => {
    bankPk = req.params.id;
    Bank.findByPk(bankPk).then(
        (bank) => {
            res.send(bank);
        }
    ).catch((err) => {
        res.send(err);
    })
}


exports.deleteBankById = async (req, res) => {
    try {
        let bankId = req.params.id;
        let bank = await Bank.findByPk(bankId);

        if (!bank) {
            res.status(404).json({
                message: "Does Not exist a bank with id = " + bankId,
                error: "404",
                bank: []
            });
        } else {
            await Bank.destroy({
                where: {
                    id: bankId
                }
            });
            res.status(200).json({
                message: "Delete Successfully a bank with id = " + bankId,
                bank: [bank],
                error: ""
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a bank with id = " + req.params.id,
            error: error.message,
            bank: []
        });
    }
}


exports.editBankById = async (req, res) => {
    try {
        let Id = req.params.id;

        let bank = await Bank.findByPk(Id);

        if (!bank) {
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a bank with id = " + Id,
                bank: [],
                error: "404"
            });
        } else {
            // update new change to database
            let updatedObject = {
                bankCode: req.body.bankCode,
                bankName: req.body.bankName,

            }
            let result = await Bank.update(
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
                    message: "Error -> Can not update a bank with id = " + req.params.id,
                    error: "Can NOT Updated",
                    bank: []
                });
            }

            res.status(200).json({
                message: "Update successfully a bank with id = " + Id,
                bank: [updatedObject],
                error: ""
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update a bank with id = " + req.params.id,
            error: error.message,
            bank: []

        });
    }
}

