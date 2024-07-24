// VERY IMPORTANT!! Start with capital letter and no plural naming for MongoDB schema defintion files

const mongoose = require('mongoose');

// DEFINE SCHEMA FOR IDEA OBJECT
const IdeaSchema = new mongoose.Schema({
	text: {
		type: String,
		required: [true, 'Please add a text field'],
	},
	tag: { type: String },
	username: { type: String },
	date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Idea', IdeaSchema);
