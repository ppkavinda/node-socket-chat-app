var express = require('express')
var router = express.Router()
var User = require('../models/user')
var Message = require('../models/message')
var path = require('path')

// auth middleware
function auth(req, res, next) {
	User.getUser((req.session.userId), function (err, result) {
		if (req.session && req.session.userId) {
			next()
		} else {
			res.status = 400
			return res.redirect('/login')
		}
	})
}

// guest middleware
function guest(req, res, next) {
	if (req.session.userId) {
		return res.redirect('back')
	} else {
		next()
	}
}

router.get('/', function (req, res, next) {
	return res.redirect('/chat')
})

router.get('/chat', auth, function (req, res, next) {
	return res.sendFile(path.join(__dirname + '/../../client/index.html'))
})

router.get('/login', guest, function (req, res, next) {
	return res.sendFile(path.join(__dirname + '/../../client/login.html'))
})

router.post('/login', function (req, res, next) {
	if (req.body.email && req.body.password) {
		User.authenticate(req.body.email, req.body.password, function (error, user) {
			if (error || !user) {
				var err = new Error('Wrong Email or Password')
				err.status = 401
				return next(err)
			} else {
				req.session.userId = user._id
				console.log('user logged in')
				return res.redirect('/chat')
			}
		})
	} else {
		var err = new Error('All fields required')
		err.status = 400
		return next(err)
	}
})

router.get('/register', guest, function (req, res, next) {
	return res.sendFile(path.join(__dirname + '/../../client/register.html'))
})

router.post('/register', function (req, res, next) {
	if (req.body.password !== req.body.passwordConf) {
		var err = new Error('Passwords not matched.')
		err.status = 400
		return next(err)
	}

	if (req.body.email && req.body.username && req.body.password && req.body.passwordConf && req.body.age) {
		var userData = {
			email: req.body.email,
			username: req.body.username,
			password: req.body.password,
			age: req.body.age,
			passwordConf: req.body.passwordConf,
			online: false,
		}

		User.create(userData, function (error, user) {
			if (error) {
				return next(error)
			} else {
				req.session.userId = user._id
				return res.redirect('/chat')
			}
		})
	} else {
		var err = new Error("All fields required")
		err.status = 400
		return next(err)
	}
})

router.get('/logout', auth, function (req, res, next) {
	if (req.session) {
		var userId = req.session.userId
		req.session.destroy(function (err) {
			if (err) {
				return next(err)
			} else {
				User.logout(userId, function (result) {
					return res.redirect('/login')
				})
			}
		})
	}
})

module.exports = router