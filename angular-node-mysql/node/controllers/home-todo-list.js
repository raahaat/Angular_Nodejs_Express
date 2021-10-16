//const database = require('../database/db');
//const db = require('db')

const toDoListModel = require('../models/home-todo-list');

exports.getToDoList = async (req, res) => {
    toDoListModel.findAll(
        { where: {employee_code: req.params.id},
          order:[['task_target_date','ASC'],
                ['task_priority','ASC']]
        }
    )
      .then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
    })
};

exports.getToDoListDate = async (req, res) => {
  
  var mysql = require('mysql');

    var con = mysql.createConnection({
      host: '10.11.201.154',
      user: "orbhrm",
      password: "orbhrm",
      database: "people_hub",
      timezone:  "+06:00"
    });

    // let company_code = '200';
    // let employee_code = '003797';
    // let connection

    con.connect(function(err) {
        if (err) throw err;
        var sql = "SELECT Distinct DATE_FORMAT(task_target_date,'%Y-%m-%d') as task_target_date FROM home_todo_list Order by task_target_date";
        con.query(sql, function (err, result) {
          if (err) throw err;
          else
          {        
            var data = result;
            //console.log(data);
            res.json(data)
          }
        });
      });

    // try {
    //   connection = await db.getConnection(database);

    //   const result = await connection.execute(
    //       `SELECT Distinct task_target_date
    //          FROM home_todo_list
    //         WHERE employee_code = :employee_code`,
    //          {employee_code: employee_code}
    //   );

    //   return res.send(result.rows);       
 
    // } 
};
