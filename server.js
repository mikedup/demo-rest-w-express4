// call packages we need
var express = require('express');
var app	= express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('demo:demo@ds033037.mongolab.com:33037/build-a-restful-api-using-node-and-express-4'); // MongoLab
var Bear = require('./app/models/bear');

// config the express4 app
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

  // create a bear
  .post(function(req, res) {
    
    var bear = new Bear();
    bear.name = req.body.name;
  
    bear.save(function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Bear created.' });
    });

  });

// register routes
app.use('/api', router);

app.listen(port)
console.log('Server started on port ' + port);