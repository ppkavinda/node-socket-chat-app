var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)
var socketIo = require('socket.io')
var path = require('path')

const PORT = 3000
var clientsList = {}

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
var session_store = new MongoStore({
		mongooseConnection: db
	})
// session middleware settings
var sessionMiddleware = session({
	secret: 'work hard',
	resave: true,
	saveUninitialized: true,
	store: session_store,
})

// use session middleware for normal requests
app.use(sessionMiddleware)

// parse incomming requests
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false }))

// printing the url of the request
app.use((req, res, next) => {
	// console.log(req.method + " " + req.url)
	next()
})

// handling routes
var routes = require('./routes/router')
app.use('/', routes)

// setting path for static files
app.use(express.static(path.join(__dirname, '../client')))

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



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////	SOCKET.IO 		////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

global.io = socketIo(server).of('/chat')

// use session middleware for socket.io requests
global.io.use(function (socket, next) {
	sessionMiddleware(socket.request, socket.request.res, next)
})

var User = require('./models/user')
var Message = require('./models/message')

// listening for a connection
io.on('connection', function (socket) {
	console.log('New connection: ID - ' + socket.id)
	var uid = socket.request.session.userId

	clientsList[uid] = socket
	// set the connected users online status :true
	User.login(uid, function (err, result) {})

	User.getUser(uid, function (err, result) {
		var info = {
			email: result.email,
			username: result.username,
			age: result.age,
			_id: result._id,
		}
		clientsList[uid].user = info
		socket.emit('my-info', info)
		socket.broadcast.emit('user-connect', info)

		// send the online users list to the newly connected user
		User.getOnlineUsers(function (err, result) {
			socket.emit('init-contact', result.filter(e => e._id != uid))
		})
	})


	socket.on('init-messages', function (contact_ids) {
		Message.getMessagesWith(uid, contact_ids.user2, function (err, result) {
			socket.emit('init-messages', result)
		})
	})

	socket.on('send-message', function (msg) {
		console.log(socket.id + " : " + JSON.stringify(msg))
		
		Message.create(msg, function (err, message) {
			if (msg.type == 'private') {
				clientsList[msg.to].emit('send-message', msg)
			} else if (msg.type == 'public') {
				socket.broadcast.emit('send-message', data)
			}
		})
	})
	socket.on('typing', function (data) {
		socket.broadcast.emit('typing', data)
	})

	socket.on('disconnect', function () {
		console.log('Disconnected: ID - ' + socket.id)
		delete clientsList[uid]

		// if user close the browser tab, put him off line
		User.logout(uid, function (err, result) {})

		// inform others
		socket.broadcast.emit('user-disconnect', { userId: uid})
		
	})
})
