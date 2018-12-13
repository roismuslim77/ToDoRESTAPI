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

let port = 0077;

app.listen(port, ()=>{
    console.log('Server is Up in port' + port)
})
