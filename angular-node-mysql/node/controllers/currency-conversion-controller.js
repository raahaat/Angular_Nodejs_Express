const currencyModel = require('../models/currency-conversion');
const { Op } = require("sequelize");

exports.getCurrencyList = async (req, res) => {
    currencyModel.findAll()
    .then(getData => { 
        res.json({isExecuted:true, data: getData});
        res.end();     
    })
};


exports.deleteCurrency = async (req, res) => {
    let deleteId = req.params.id;
    currencyModel.destroy(
        { where: {id: deleteId}}
      )
      .then( () => {
            res.json({isExecuted:true, message: "Data deleted successfully."});
            res.end();
          })
        .catch(err => {
          res.json({isExecuted:false, message: "Data is not deleted."});
          res.end();
        });
};


exports.editCurrency = async (req, res) => {
  let editId = req.params.id;
  currencyModel.findOne(
      { where: {id: editId}}
    )
  .then(editData => {
    res.json({isExecuted:true, data: editData, message: "Data fetched successfully."});
    res.end();
    })
  .catch(err => {
    res.json({isExecuted:false, message: "Error to get data."});
    res.end();
  });
};

exports.updateCurrency = async (req, res) => {
   let updatedId = req.params.id;
   currencyModel.findOne({
    where: {
      id: { [Op.ne]: updatedId },
      company_code: req.body.company_code,
      base_currency: req.body.base_currency,
      conversion_currency: req.body.conversion_currency,
      conversion_date: req.body.conversion_date
    }
    })
    .then(data => {
      if (!data) {
        currencyModel.update(
          {company_code: req.body.company_code,
           base_currency: req.body.base_currency,
           conversion_currency: req.body.conversion_currency,
           conversion_date: req.body.conversion_date,
           conversion_rate: req.body.conversion_rate,
           round_scale: req.body.round_scale,
           update_by: req.body.update_by,
           update_date: req.body.update_date},
            {where: {id: updatedId}}
          )
          .then(()=> {
            res.json({isExecuted:true, message:"Successfully Updated Data."});
            res.end();
          })
          .catch (err => {
            res.json({isExecuted:false, message:"Unknown Error: "+ err});
            res.end();
          })
      } else {
        res.json({isExecuted:false, message:"Data already exists in table."});
        res.end();
      }
    })
  };


exports.addCurrency = async (req, res) => {

  const currencyData = {
        company_code: req.body.company_code,
        base_currency: req.body.base_currency,
        conversion_currency: req.body.conversion_currency,
        conversion_date: req.body.conversion_date,
        conversion_rate: req.body.conversion_rate,
        round_scale: req.body.round_scale,
        insert_by: req.body.insert_by,
        insert_date: req.body.insert_date
  };
  
  currencyModel.findOne({
    where: {
      company_code: req.body.company_code,
      base_currency: req.body.base_currency,
      conversion_currency: req.body.conversion_currency,
      conversion_date: req.body.conversion_date
    }
    })
    .then(data => {

      if (!data) {
        currencyModel.create(currencyData)
          .then(() => {
            console.log(currencyData);
            res.status(201).json({isExecuted:true, message:"Successfully data added."});
            res.end();
          })
          .catch(err => {
            res.json({isExecuted:false, message:"Error to save data."});
            res.end();
          }) 
      } else {
        res.json({isExecuted:false, message:"Data already exists in table."});
        res.end();
      }
    })
    .catch(err => {
      res.json({isExecuted:false, message:"Error to save data!!!"});
      res.end();
    })
};