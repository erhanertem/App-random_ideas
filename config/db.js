const mongoose = require('mongoose');

const connectDB = async () => {
	const db = await mongoose.connect(process.env.MONGO_URI);
	console.log(`MongoDB connected ${db.connection.host}`);
};

module.exports = connectDB;
