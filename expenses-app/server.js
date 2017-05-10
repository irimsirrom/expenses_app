    var express  = require('express');
    var app = express();
    var mongoose = require('mongoose');
    var morgan = require('morgan');
    var bodyParser = require('body-parser');
    var methodOverride = require('method-override');
    var fetch = require('node-fetch');

    mongoose.connect('mongodb://irimsirrom:Mirilivesat167@ds133290.mlab.com:33290/testing', function(err, db) {
        if (err) {
            console.log('Unable to connect to the server. Please start the server. Error:', err);
        } else {
            console.log('Connected to Server successfully!');
        }
    });

    app.use(express.static(__dirname + '/public'));
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({'extended':'true'}));
    app.use(bodyParser.json());
    app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
    app.use(methodOverride());

    //  model =================
      var Expenses = mongoose.model('Expenses', {
          text : String,
          amount: Number,
          type: String,
          currency: String,
          usd: Number,
          cdn: Number,
          nis: Number
      });

    // routes ======================================================================

      // get
      app.get('/api/expenses', function(req, res) {
          Expenses.find(function(err, expenses) {
              if (err)
                  res.send(err)
              res.json(expenses);
          });
      });


      app.get('/api/currency', function(req, res){
        fetch('http://www.apilayer.net/api/live?access_key=09eab4c2dd605db2575ecae2b79ecf9f')
          .then(function(res) {
            return res.json();
          }).then(function(json) {
              console.log(json);
            });
      }

      // post
      app.post('/api/expenses', function(req, res) {
          Expenses.create({
              text : req.body.text,
              amount : req.body.amount,
              type : req.body.type,
              currency : req.body.currency,
              usd : req.body.usd,
              cdn : req.body.cdn,
              nis : req.body.nis,
              done : false
          }, function(err, expense) {
              if (err)
                  res.send(err);
              Expenses.find(function(err, expenses) {
                  if (err)
                      res.send(err)
                  res.json(expenses);
              });
          });
      });

      // delete
      app.delete('/api/expenses/:expense_id', function(req, res) {
          Expenses.remove({
              _id : req.params.expense_id
          }, function(err, expense) {
              if (err)
                  res.send(err);
              Expenses.find(function(err, expenses) {
                  if (err)
                      res.send(err)
                  res.json(expenses);
              });
          });
      });

    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });

    app.listen(3000);
    console.log("App listening on port 3000");
