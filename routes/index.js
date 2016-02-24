
var Message = require('../controllers/messages.js');

module.exports.socket = function(socket, app) {
	var io = socket;

	var router = app.Router();

	Message.remove({}, function(err) { 
	   console.log('collection removed') 
	});

	router.get('/', function(req, res) {
		res.sendfile('views/index.html');
	});

	router.get('/messages', function(req, res) {
		Message.find({}, function(err, docs) {
			res.json(docs);
		});
	});

	router.post('/new', function(req, res) {
		var msg = new Message(req.body);
		msg.save();
		io.emit('new message', msg);
		res.send(200);
	}); 

	return router;
}