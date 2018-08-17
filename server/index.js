var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)
var socket = require('socket.io')
var path = require('path')

const PORT = 3000

// connecting to MongoDB
mongoose.connect('mongodb://localhost/socket-chat')
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
var io = socket(server)


// listening for a connection
io.on('connection', function (socket) {
	console.log('New connection: ID - ' + socket.id)
	
	socket.on('chat', function (data) {
		console.log(socket.id + " : " + JSON.stringify(data))
		socket.broadcast.emit('chat', data)
	})

	socket.on('typing', function (data) {
		socket.broadcast.emit('typing', data)
	})

	socket.on('disconnect', function () {
		console.log('Disconnected: ID - ' + socket.id)
	})
})
