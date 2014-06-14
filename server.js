// call packages we need
var express = require('express');
var app	= express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('demo:demo@ds033037.mongolab.com:33037/build-a-restful-api-using-node-and-express-4'); // MongoLab

// config the express4 app
app.use(bodyParser());

// set our port to come from environmental variable or fallback to 8080
var port = process.env.PORT || 8080;

// ROUTES
// ======================
var router = express.Router();

router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
});

// more routes needed

// register routes
app.use('/api', router);

app.listen(port)
console.log('Server started on port ' + port);