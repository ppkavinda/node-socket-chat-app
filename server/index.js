var express = require('express')
var app = require('express')()
var socket = require('socket.io')
var path = require('path')

const PORT = 3000

// starting the server (listening to PORT)
var server = app.listen(PORT, function () {
	console.log('Server started at port: ' + PORT)
})
var io = socket(server)

// setting path for static files
app.use(express.static(path.join(__dirname, '../client')))

// printing the url of the request
app.use((req, res, next) => {
	console.log(req.method + " " + req.url)
	next()
})

// responding to get request at '/'
// app.get('/', function (req, res) {
// 	console.log(req.method + " " + req.url)
// 	res.sendFile(__dirname + '/inddex.html')
// })

// listening for a connection
io.on('connection', function (socket) {
	console.log('New connection: ID - ' + socket.id)
	
	socket.on('chat', function (data) {
		console.log(socket.id + " : " + data)
		io.sockets.emit('chat', data)
	})

	socket.on('typing', function (data) {
		socket.broadcast.emit('typing', data)
	})
})
