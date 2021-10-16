const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000
const db = require('./database/db.js');
const dotenv = require('dotenv');

app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);


const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
  // origin: 'http://localhost:4200',
}

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors(corsOptions));



const customerSignUpRoute = require('./routes/customer_signup_route');
const  getAllowanceMaster  = require('./routes/allowance-route');
app.use('/api', customerSignUpRoute);
app.use('/api', getAllowanceMaster);

dotenv.config();

db.sync().then(result => {
    app.listen(port, () => {
        console.log(`Nodejs Server started on port: ` + port);
    });
}).catch(err => {
    console.log('Database Connection Error: ', err);
});

// try {
//   app.listen(port, () => {
//     console.log('Server is running on port: ' + port)
//   });
// } catch {
// console.log('Server Connection error.');
// };
