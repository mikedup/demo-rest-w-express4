// call packages we need
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// config files
var db = require('./config/db');

// models
var Bear = require('./app/models/bear');

// connect to MongoDB with Mongoose
mongoose.connect(db.url);

// config the express4 app
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

// set our port to come from environmental variable or fallback to 8080
var port = process.env.PORT || 8080;

// ROUTES
// ======================
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
  console.log('Something is happening.');
  next();
})

router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/bears')

  // create a bear (accessed at POST http://localhost:8080/api/bears)
  .post(function(req, res) {
    
    var bear = new Bear();
    bear.name = req.body.name;
  
    bear.save(function(err) {
      if (err)
        res.send(err);

      // Return updated bears object
      Bear.find(function (err, bears) {
        if (err)
          res.send(err);

        res.json(bears);
      })
    });

  })

  // get all the bears (accessed at GET http://localhost:8080/api/bears)

  .get(function(req, res) {

    Bear.find(function(err, bears) {

      if (err)
        res.send(err);

      res.json(bears);
    })
  });

router.route('/bears/:bear_id')

  // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
  .get(function(req, res) {
    
    Bear.findById(req.params.bear_id, function(err, bear) {
  
      if (err)
        res.send(err);
  
      res.json(bear);
    });
  
  })

  // update the bear with this is (accessed at PUT http://localhost:8080/api/bears/:bear_id)
  .put(function(req, res) {
    
    Bear.findById(req.params.bear_id, function(err, bear) {
      
      if (err)
        res.send(err);

      bear.name = req.body.name;

      bear.save(function(err) {
        if (err)
          res.send(err)

        res.json({ message: 'Bear name changed to ' + bear.name })
      });

    });
  
  })

  // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
  .delete(function(req, res) {
    Bear.remove({
      _id: req.params.bear_id
    }, function(err, bear) {
      if (err)
        res.send(err);

      // Return updated bears object
      Bear.find(function (err, bears) {
        if (err)
          res.send(err);

        res.json(bears);
      })
    });
  });

// register routes
app.use('/api', router);

app.listen(port)
console.log('Server started on port ' + port);