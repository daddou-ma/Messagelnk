// sockets.js
var socketio = require('socket.io');

module.exports.listen = function(app){
    var io = socketio.listen(app);

    io.on('connection', function(socket){
    	socket.on('users', function(user) {
    		socket.emit('users',user);
    	});
        
    })

    return io;
}