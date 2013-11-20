var express = require('express');
var sio = require('socket.io');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

server.listen(8080);

var posts = [
	{ avatar: 'av1.gif', author: 'Jane Doe', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras pulvinar vehicula enim ut convallis. Aliquam condimentum imperdiet tortor, at fermentum augue cursus vitae. Quisque libero nulla, mattis semper aliquet ac, rhoncus eget dolor. Aliquam commodo eros id justo vehicula mattis.' },
	{ avatar: 'av2.png', author: 'John Doe', text: 'Nam interdum dolor sapien. Proin nulla nisl, tempus condimentum consectetur sed, mollis a nisi. Cras id nibh pretium velit ornare rutrum. Morbi euismod leo sit amet libero sodales tempor. Integer eu tincidunt lacus. Etiam imperdiet urna pulvinar odio laoreet rhoncus. Proin id pharetra sem.' },
	{ avatar: 'av3.jpg', author: 'Jeffrey Doe', text: 'Ineger at orci vel dui tincidunt hendrerit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin et bibendum est. Fusce bibendum vestibulum dui ac aliquam. Suspendisse sodales elementum dignissim. Sed sem sapien, bibendum vel eros eu, euismod lobortis magna. Sed dictum tortor felis.' }
];

app.use(express.static('./static'));
app.use(express.bodyParser());

app.get('/getpost', function (req, res) {
	res.end(postTemplate(posts[Math.floor(Math.random() * 3)]));
});

io.sockets.on('connection', function (socket) {
  socket.on('getpost', function () {
    socket.emit('getpost', posts[Math.floor(Math.random() * 3)]);
  });
});
