var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var contactRouter=require('./routes/contact')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//MONGO
const mongoose = require('mongoose')
const username="lucian"
const password="kozgsU2BpfQ3iNjI"



///Insert data
const MongoClient = require('mongodb').MongoClient;

const url = `mongodb+srv://${username}:${password}@gettingstarted.d4yhb8b.mongodb.net/?retryWrites=true&w=majority`; // Connection URL
const dbName = 'Testluci'; // Database name

async function insertData() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection('users'); // Replace 'users' with your collection name

    const dataToInsert = {
      title: 'Mada Lucii',
      content: 'johndoe@example.com',
      luci: 'sarmale',
    };

    const result = await collection.insertOne(dataToInsert);
    console.log('Data inserted successfully:', result);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    client.close();
    console.log('Disconnected from MongoDB');
  }
}
app.get('/try',(req,res)=>{

  insertData();
})

//app.use('/', indexRouter);
app.get('/', function (req, res) {
  res.redirect('/home');
});

app.use('/users', usersRouter);
app.use('/contact',contactRouter);
app.use('/home',indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
