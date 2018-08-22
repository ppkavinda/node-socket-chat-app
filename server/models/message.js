var mongoose = require('mongoose')

var MessageSchema = new mongoose.Schema({
	from: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	to: {
		type: String,
		required: true,
	},
	body: {
		type: String,
		required: true,
	},
	postedOn: {
		type: Date,
		required: true,
	},
	type: {
		type: String,
	},
})

MessageSchema.statics.getMessagesWith = function (user1, user2, callback) {
	User.find({to: user1, to: user2, from: user2, from: user1}, function (err, result) {
		callback(err, result)
	})
}

var Message = mongoose.model('message', MessageSchema)
module.exports = Message