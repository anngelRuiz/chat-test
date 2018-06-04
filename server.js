var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.use('/img', express.static('img'));
app.use('/js', express.static('js'));
app.use('/css', express.static('css'));
// app.use('/css', express.static('css'));

users = [];
connections = [];

server.listen(process.env.PORT || 8080);

console.log('Server running ...');

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket){
    connections.push(socket);
    console.log('Connected: %s sockets connected', connections.length);

    //Disconnect
    socket.on('disconnect', function(data){
        //if(!socket.username) return;
        users.splice(users.indexOf(socket.username), 1);
        updateUserNames();
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected: %s sockets connected', connections.length);
    });

    // Send Message
    socket.on('send message', function(data){   
        io.sockets.emit('new message', { msg: data, user: socket.username, photo: socket.avatar});
        // Broadcast emit all clients except sender
        //socket.broadcast.emit('new message', { msg: data, user: socket.username, photo: socket.avatar }); 
    });

    // New User
    socket.on('new user', function(data, callback){
        callback(true);
        socket.username = data.name;
        socket.avatar = data.photo;
        users.push({ name: socket.username, photo: socket.avatar});

        updateUserNames();
    });

    function updateUserNames(){
        io.sockets.emit('get users', users);
    }
    
});