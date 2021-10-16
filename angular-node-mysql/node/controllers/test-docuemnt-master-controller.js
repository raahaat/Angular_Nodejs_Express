const docMastertModel = require('../models/test-document-master');
const Sequelize = require('sequelize');

exports.generateDocumentNo = async (req) => {
    var compCode = '200';
    var documentType = req; //PR/IN/CF/NPS
    var docLength;
    var getDocNo;
    var generatedDocNumber;

    if (documentType) {
     await docMastertModel.findAll({
        where: {
          company_code: compCode, 
          document_type: documentType, 
          valid_flag: 'Y'}
    })
    .then(getData => { 
        docLength = getData[0]['dataValues']['document_length'];
        getDocNo = getData[0]['dataValues']['document_number']+1;
        generatedDocNumber = documentType + getDocNo.toString().padStart((docLength - documentType.length), '0')

        docMastertModel.update(
            {document_number: getDocNo},
              {where: {
                  company_code: compCode, 
                  document_type: documentType, 
                  valid_flag: 'Y'}}
            ).catch (err => {
               console.log(err);
               throw err;
            })

    }).catch((err)=> {
        throw err; 
    })   
    
  } else {
      console.log('No Document type found!!!');
      throw err;
  };
 
  if (generatedDocNumber) {
    return generatedDocNumber;
  } 

};


exports.reverseDocumentNo = async (req) => {
   var compCode = '200';
   var documentType = req;
    if (documentType) {
       await docMastertModel.update(
            {document_number: Sequelize.literal('document_number - 1')},
              {where: {
                  company_code: compCode, 
                  document_type: documentType, 
                  valid_flag: 'Y'}}
            ).then ( () => {
              console.log('Document number reversed!');
            }
            ).catch (err => {
               console.log(err);
               throw err;
        })
    }
};