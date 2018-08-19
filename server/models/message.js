var mongoose = require('mongoose')

var MessageSchema = new mongoose.Schema({
	username: {
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

var Message = mongoose.model('message', MessageSchema)
module.exports = Message