var mongoClient = require('mongodb').MongoClient;

var URL = "mongodb://127.0.0.1:27017/";

var config = { useUnifiedTopology: true };
mongoClient.connect(URL, config, function(error, MMongoClient){
    if(error){
        console.log('Database connection failed.');

    }else{
        console.log('Database connection successful');
      insertData(MMongoClient);
      // deleteOneItem(MyMongoClient);
     // deleteMany(MyMongoClient);
     //findOneItem(MyMongoClient);
     //findAllitem(MMongoClient);
    //findAllitembyProjection(MMongoClient);
    //findAllitembyLimit(MMongoClient);
    //findAllitembysorting(MMongoClient);
    //updateData(MMongoClient);
    }
})


function insertData(MMongoClient){
    var mydb = MMongoClient.db("era_infotech");
    var myCollection = mydb.collection('employees');

    var data = {name:"Rahat Ahmed", age:"25", position:"Trainee", salary:"200000"};
    myCollection.insertOne(data, function(error){
        if(error){
            console.log('inserting error');
        }else{
            console.log('insertion successful');
        }
    })

}

function deleteOneItem(MMongoClient){
    var mydb = MMongoClient.db("era_infotech");
    var mycollection = mydb.collection('employees');

    var data = {salary: "10000"}

    mycollection.deleteOne(data,function(error){
        if(error){
            console.log('deletion error');
        }else{
            console.log('deleted successfully')
        }
    })

}

function deleteMany(MMongoClient){
    var mydb = MMongoClient.db("era_infotech");
    var myCollection = mydb.collection('employees');

    myCollection.deleteMany(function(error, resultObj){
        if(error){
            console.log('deletation failed')
    }else{
        console.log(resultObj.result.n + ' item deleted')
    }
    })
}

function findOneItem(MMongoClient){
    var mydb = MMongoClient.db('era_infotech');
    var myCollection = mydb.collection('employees');
    data = {age: "24"}
    myCollection.findOne(data, function(error, result){
        console.log(result.name);
    })
}
function findAllitem(MMongoClient){
    var mydb = MMongoClient.db('era_infotech');
    var myCollection = mydb.collection('employees');

  
    myCollection.find().toArray(function(error, result){
        console.log(result);
    })
}

function findAllitembyProjection(MMongoClient){
    var mydb = MMongoClient.db('era_infotech');
    var myCollection = mydb.collection('employees');
    
    var uname = "Mahamudul Hasan";
    var itemObj= {name: uname}
    var itemProjection = {projection:{_id: 0, name:1, salary: 1}}
    myCollection.find(itemObj, itemProjection).toArray(function(error, result){
        console.log(result);
    })
}

function findAllitembyLimit(MMongoClient){
    var mydb = MMongoClient.db('era_infotech');
    var myCollection = mydb.collection('employees');
    var itemObj = {}
    var itemProjection = {projection:{_id: 0, name:1, salary: 1}}
    myCollection.find(itemObj, itemProjection).limit(3).toArray(function(error, result){
    console.log(result);
    })
}

function findAllitembysorting(MMongoClient){
    var mydb = MMongoClient.db('era_infotech');
    var myCollection = mydb.collection('employees');
    var sortPattern = {name: -1}
 
    
    myCollection.find().sort(sortPattern).limit(10).toArray(function(error, result){
    console.log(result);
    })
}

function updateData(MMongoClient){
    var mydb = MMongoClient.db('era_infotech')
    var myCollection = mydb.collection('employees')

    var query = {name: "saima zaman"}
    var updatedData = {$set: {name: "Saima Zaman" , age: "20", salary: "11500"}}

    myCollection.updateOne(query, updatedData, function(error, result){
        if(error){
            console.log('data updatation failed')
        }else{
            console.log('data updatation successful!')
        }

    })
}