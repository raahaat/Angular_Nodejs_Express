const processSalaryModel = require('./models/process-salary')
const Sequelize = require('sequelize');
const { QueryTypes } = require('sequelize');
const dbConnect = require('./database/db');

async function MATCH_PASS_NODE(userName, userPassword){
  let compCode = '200';
  let eId = '171';
  let totalDays = 31;
  let salCurrentMonth = 12;
  let salCurrentYear = 2020;
  let days = 31;
  let hours = 8;
  let current_date = new Date();
  let finalAmount = 0;
  let deductAmount = 0;
  let salProcessFlag = 'N';
  let fromDate = new Date('01 Dec 2020').toISOString();
  let toDate = new Date('31 Dec 2020').toISOString();


  // let earnDeductAmount = 100;
  // let basicAmount = 50;
  // let diffAmount = (Number(earnDeductAmount) - Number(basicAmount))

  // await processSalaryModel.update({
  //             amount: Sequelize.literal(`amount - ${diffAmount}`),
  //             insert_by: 'VSCODE-2'
  //           }, {
  //             where: {
  //               company_code: '200',
  //               employee_code: '000100',
  //               salary_head: 'ER016',
  //               source: 'FXTRNS'
  //             }
  //           }
  //           ).then((update)=> {
  //             console.log(update);
  //           })
 // let amount = Number.parseFloat(50.5699).toFixed(1);
  // console.log(userName, userPassword);
  let var1;
  let var2;
  let var3;
  let var4;
  let var5;
  let var55;
  let var6;
  let var7;
  let var8;
  let var9;  
  let var10;
  let var66;
  let mul1;
  let mul2;
  let mul3;
  let mul4;
  let mul5;
  let mul6;
  let mulfin;
  let mullen;
  let loopfor;
  let store;
  let ctr;
  let i;
  let subs;

  if (userName.length !== 6 || userPassword.length !== 6) {
    return ('Password should be Six Characters of Length. ');
  }
  var1 =  userName.substring(0,1).charCodeAt(0);
  var2 =  userName.substring(1,2).charCodeAt(0);
  var3 =  userName.substring(2,3).charCodeAt(0);
  var4 =  userName.substring(3,4).charCodeAt(0);
  var5 =  userName.substring(4,5).charCodeAt(0);
  var55 = userName.substring(5,6).charCodeAt(0);

  var2 = var2 * 2;
  var3 = var3 * 3;
  var4 = var4 * 4;
  var5 = var5 * 5;
  var55 = var55 * 1;

  var6 =  userPassword.substring(0,1).charCodeAt(0);
  var7 =  userPassword.substring(1,2).charCodeAt(0);
  var8 =  userPassword.substring(2,3).charCodeAt(0);
  var9 =  userPassword.substring(3,4).charCodeAt(0);
  var10 = userPassword.substring(4,5).charCodeAt(0);
  var66 = userPassword.substring(5,6).charCodeAt(0);
  
  var7  = var7 * 2;
  var8  = var8 * 3;
  var9  = var9 * 4;
  var10 = var10 * 5;
  var66 = var66 * 1;

  /**** Cross Multiplication ****/

  mul1 = var1 * var10;
  mul2 = var2 * var9;
  mul3 = var3 * var8;
  mul4 = var4 * var7;
  mul5 = var5 * var6;
  mul6 = var55 * var66;

  mulfin = mul1.toString()+mul2.toString()+mul3.toString() + mul4.toString()
    + mul5.toString() + mul6.toString();
  
  mullen = mulfin.length;
  if ((mullen % 3) !== 0) {
    loopfor = (Math.floor(mullen/3)) + 1 ;
  } else {
    loopfor = (mullen/2);
  }

  ctr = 1;
  i = 0;

  while (Number(ctr) <= Number(loopfor)) {
    subs = mulfin.substring(i,i+2);
    if ( !(Number(subs) >= 48 && Number(subs) <= 57)) {
      if (Number(subs) > 90) {
       while (subs >= 91) {
        subs = Number(subs) - 26;
       }
      }
      if (Number(subs) < 65) {
        while (Number(subs) <= 64) {
          subs = Number(subs) + 26;
        }
      }
    }
    
    store = (store?store:'') + String.fromCharCode(subs);
    ctr = Number(ctr) + 1;
    i = Number(i) + 3;
  }
  
   console.log(store);
   return store;
}

// MATCH_PASS_NODE('003797','123456');
const matchPassNodeController = require('./controllers/match-pass-node-controller');

let matchPass;
let checkPass =  matchPassNodeController.matchPassNode('003797','123456');

if (checkPass) {
  checkPass.then((result) => {
    matchPass = result;
    console.log(matchPass);
  }).catch((error) => {
      console.log("Error", error);
  })
  
}




