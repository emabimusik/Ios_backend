var mongoose = require('mongoose');
//var Schema = mongoose.Schema;

var RestaurantSchema = new mongoose.Schema({
    name: String,
    category: String,
    location: String,
    imageName: String,
    isVisited: Boolean

});

module.exports = mongoose.model('Restaurant', RestaurantSchema);