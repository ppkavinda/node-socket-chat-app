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
					return callback(null, user)
				} else {
					return callback()
				}
			})
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