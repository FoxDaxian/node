const mongoose = require('mongoose')
const Schema = mongoose.Schema
var userSchema = new Schema({
	username: {
		type: String,
		default: ''
	},
	account: String,
	password: String,
	email: String,
	avator: {
		type: String,
		default: ''
	},
	create_at: {
		type: Date,
		default: Date.now
	}
})
var User = mongoose.model('User',userSchema)
module.exports = User
