var mongoose = require('mongoose')
var bcrypt = require('bcrypt')

var UserSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true,
	},
	username: {
		type: String,
		unique: true,
		required: true,
		trim: true,
	},
	age: {
		type: Number,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	online: {
		type: Boolean,
		required: false,
	},
})

UserSchema.statics.authenticate = function (email, password, callback) {
	User.findOne({email: email})
		.exec(function (err, user) {
			if (err) {
				return callback(err)
			} else if (!user) {
				var err = new Error ('User not Found')
				err.status = 401
				return callback(err)
			}
			bcrypt.compare(password, user.password, function (err, result) {
				if (result === true) {
					// change online status
					// User.login(user._id, function (err, result) {
						// console.log('authenticate login')
					// })
					return callback(null, user)
				} else {
					return callback()
				}
			})
		})
}

UserSchema.statics.login = function (userId, callback) {
	User.findOneAndUpdate({_id: userId}, {online: true}, function (err, result) {
		return callback(err, result)
	})
}
UserSchema.statics.logout = function (userId, callback) {
	User.findOneAndUpdate({_id: userId}, {online: false}, function (err, result) {
		return callback(result)
	})
}

UserSchema.statics.getUser = function (userId, callback) {
	User.findOne({_id: userId}, function (err, result) {
		return callback(err, result)
	})
}

UserSchema.statics.getOnlineUsers = function (callback) {
	User.find({online: true}, function (err, result) {
		return callback(err, result)
	})
}

UserSchema.pre('save', function (next) {
	var user = this
	bcrypt.hash(user.password, 10, function (err, hash) {
		if (err) {
			return next(err)
		}
		user.password = hash
		next()
	})
})

var User = mongoose.model('user', UserSchema)
module.exports = User