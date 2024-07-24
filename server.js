const path = require('path');
const express = require('express');

const connectDB = require('./config/db');
const ideasRouter = require('./routes/ideas');

// DOTENV SETUP & PORT FORWARDING
require('dotenv').config();
const PORT = process.env.PORT || 5000;
// ACQUIRE MONGODB CONNECTION
connectDB();

// > INSTANTIATE EXPRESS APP
const app = express();

// SET STATIC 'PUBLIC' FOLDER
app.use(express.static(path.join(__dirname, 'public')));

//BODY PARSER MIDDLEWARE - allo accessing req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// > ENDPOINTS
// ROOT PAGE
app.get('/', (req, res) => {
	// res.send('Hello World');
	// res.send({ message: 'Hello World' }); //Basically the same thing as below code
	res.json({ message: 'Welcome to RandomIdeas API' }); //Expects json response
});

// IMPORT IDEAS ENDPOINTS FROM IDEAS ROUTER
app.use('/api/ideas', ideasRouter);

// > LISTEN SERVER @ PORT
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
