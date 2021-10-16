const dbConnect = require('../database/db');
const Sequelize = require ('sequelize');
const {QueryTypes} = require ('sequelize');
const salaryCertificateModel = require('../models/sal-cer-gen-temp');

exports.getLetterIntroInfo = async (req, res) => {
  try {
    let companyCode = '200';
    let employeeCode = req.params.empId;
    let getData = 
     await dbConnect.query(`Select substr(a.salary_head,1,2) hard_code, substr(a.salary_head,3) soft_code, a.employee_code, 
                                   a.salary_head, b.headName head_name, a.amount
                              From cor_emp_current_salary a, con_earn_head b 
                             Where a.company_code = '${companyCode}'
                               And a.company_code = b.company_code
                               And a.salary_head = b.headCode
                               And a.employee_code = '${employeeCode}'                    
                              Union All                 
                            Select substr(a.deduction_link_code,1,2) hardCode, substr(a.deduction_link_code,3) softCode, a.employee_code,
                                   a.deduction_link_code, c.headName , sum(a.installment_amount) insAmount
                             From pay_loans_advances a, cor_employee_master b, con_earn_head c
                            Where a.company_code = '${companyCode}'
                              And a.company_code = b.company_code
                              And a.company_code = c.company_code
                              And a.deduction_link_code = c.headCode
                              And a.employee_code = b.employee_code 
                              And a.waived_flag !='C'
                              And a.employee_code = '${employeeCode}'
                              And Sysdate() between a.start_date and a.end_date
                         Group by a.employee_code, a.deduction_link_code
                         Order by 1 desc, 2 asc`
                            ,{type: QueryTypes.SELECT})
     return res.json(getData)
  } catch (error) {
    console.log(error);
    return res.json(null)
  }  
}; 


exports.generateReport = async (req, res) => {
  try {
    const formValue = req.body[0];
    const salaryList = req.body[1];
    let company_code = formValue.company_code;
    let employee_code = formValue.employee_code;
    let sign_01 = formValue.sign_01;
    let sign_02 = formValue.sign_02;
    let document_date = formValue.document_date;
    let insert_by = formValue.insert_by;
    let insert_date = formValue.insert_date;

    let duplicateSearch =
    await salaryCertificateModel.findAll({
      where: {
        company_code: company_code,
        employee_code: employee_code
      }
    })

    if (duplicateSearch) {
      await salaryCertificateModel.destroy({
        where: {
          company_code: company_code,
          employee_code: employee_code
        }
      })
    }

    await salaryList.forEach(async element=> {
      let salRecord = {
        company_code: company_code,
        employee_code: employee_code,
        salary_head: element.salary_head,
        amount: element.amount,
        // sal_session: '',
        document_date: document_date,
        sign_01: sign_01,
        sign_02: sign_02,
        insert_by: insert_by, 
        insert_date: insert_date
      }

      await salaryCertificateModel.create(salRecord)    
    })

    return res.json({isExecuted: true, message: 'Data successfully saved.'})
  } catch (error) {
    console.log(error);
    return res.json({isExecuted: false, message: 'Error to save data in Temp table!'})
  }
}

 




 



