const express = require('express');
const bodyParser = require('body-parser');

const ToDo = require('./routes/todo.route');
const app = express();

//setup mongoose
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://roismuslim7:tsani888@ds139950.mlab.com:39950/gbootcamp'
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo DB connection error'));

//sett bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/todoapp', ToDo);

// set CORS to allow access from any server
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods", "PUT, PATCH, POST, DELETE, GET");
        return res.status(200).json({});
    }

    next();
});

let port = process.env.PORT||3000;

app.listen(port, ()=>{
    console.log('Server is Up in port' + port)
})
