// load mongoose




//mongoose.connect('mongodb://emabi16:Tinofara_1@ds137207.mlab.com:37207/afridane'); // connect to our database
// create a schema

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var morgan = require('morgan');

// configure app
//app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

var mongoose = require('mongoose');
mongoose.connect('mongodb://emabi16:Tinofara_1@ds137207.mlab.com:37207/afridane'); // connect to our database
var Restaurant = require('./app/models/restaurant');

// ROUTES FOR OUR API
// =============================================================================
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// var potatoBag = [{ name: 'DRC' }, { name: 'CONGO' }];
var potatoBag = require('./app/models/data');

//db.once('open', function() {
// console.log('we  are connected');
// Restaurant.create(potatoBag, function(err) {
//  if (err)
//        console.log(err)
//  });
//});
// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// on routes that end in /restaurant
// ----------------------------------------------------
router.route('/restaurants')

// create a restaurant (accessed at POST http://localhost:8080/restaurant)
.post(function(req, res) {

    var restaurant = new Restaurant(); // create a new instance of the restaurant model
    restaurant.name = req.body.name;
    restaurant.category = re.body.category;
    restaurant.location = re.body.location;
    restaurant.imageName = re.body.imageName;
    restaurant.isVisited = re.body.isVisited;
    // set the restaurant name (comes from the request)
    console.log(restaurant.name);
    restaurant.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'restaurant created!' });
    });


})

// get all the restaurant (accessed at GET http://localhost:8080/api/restaurant)
.get(function(req, res) {
    Restaurant.find(function(err, restaurants) {
        if (err)
            res.send(err);

        res.json(restaurants);
    });
});

// on routes that end in /restaurant/:restaurant_id
// ----------------------------------------------------
router.route('/restaurant/:restaurant_id')

// get the restaurant with that id
.get(function(req, res) {
    restaurant.findById(req.params.restaurant_id, function(err, restaurant) {
        if (err)
            res.send(err);
        res.json(restaurant);
    });
})

// update the restaurant with this id
.put(function(req, res) {
    Restaurant.findById(req.params.restaurant_id, function(err, restaurant) {

        if (err)
            res.send(err);

        restaurant.name = req.body.name;
        restaurant.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Restaurant updated!' });
        });

    });
})

// delete the restaurant with this id
.delete(function(req, res) {
    Restaurant.remove({
        _id: req.params.restaurant_id
    }, function(err, restaurant) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
});


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);