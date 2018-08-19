var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)
var socketIo = require('socket.io')
var path = require('path')

const PORT = 3000
global.clientsList = {}

// connecting to MongoDB
mongoose.connect('mongodb://localhost/socket-chat', {useNewUrlParser: true})
var db = mongoose.connection

// handle mongo errors
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function () {
	// connected
	console.log('mongoDB connected!')
})

// use session for track logins
app.use(session({
	secret: 'work hard',
	resave: true,
	saveUninitialized: true,
	store: new MongoStore({
		mongooseConnection: db
	})
}))

// parse incomming requests
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false }))

// setting path for static files
app.use(express.static(path.join(__dirname, '../client')))

// printing the url of the request
app.use((req, res, next) => {
	console.log(req.method + " " + req.url)
	next()
})

// handling routes
var routes = require('./routes/router')
app.use('/', routes)

// catch 404 and forward to error handling
app.use(function (req, res, next) {
	var err = new Error('File not Found')
	err.status = 404
	next(err)
})

// handling errors
app.use(function (err, req, res, next) {
	res.status(err.status || 500)
	res.send(err.message)
})

// starting the server (listening to PORT)
var server = app.listen(PORT, function () {
	console.log('Server started at port: ' + PORT)
})




var io = socketIo(server).of('/chat')

var User = require('./models/user')
// listening for a connection
io.on('connection', function (socket) {
	console.log('New connection: ID - ' + socket.id)

// send the online users list to the newly connected user
	User.getOnlineUsers(function (err, result) {
		socket.emit('set-contact', result)
	})

	User.getUser(global.userId, function (err, result) {
		socket.broadcast.emit('user-connect', result)
	})

	// socket.on('set-username', function (username) {
		// console.log(username + "Cliend List")
		// if (clientsList[socket.id] == undefined) {
			// clientsList[socket.id] = {socket: socket, username: username}
		// }
		// console.log(clientsList)
	// })

	socket.on('chat', function (data) {
		console.log(socket.id + " : " + JSON.stringify(data))
		socket.broadcast.emit('chat', data)
	})

	socket.on('typing', function (data) {
		socket.broadcast.emit('typing', data)
	})

	socket.on('disconnect', function () {
		console.log('Disconnected: ID - ' + socket.id)
		socket.broadcast.emit('user-disconnect', { userId: global.userId})
	})
})
