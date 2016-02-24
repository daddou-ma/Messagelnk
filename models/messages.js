var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var message = new Schema({
	user: String,
	message: String,
	color: String
});

var msg = mongoose.model('Message', message);

module.exports = msg;