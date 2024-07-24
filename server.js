const path = require('path');
const express = require('express');
const cors = require('cors');

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

// CORS MIDDLEWARE - allow communication/resource sharing between these ports/services
// > #1.Alternate Setup
// Apply CORS middleware to all routes and handle preflight requests
app.use(
	cors({
		origin: ['http://localhost:3000', 'https://localhost:5000'],
		credentials: true, // sets "Access-Control-Allow-Credentials", "true"
	})
);
// // > #2. Alternate setup
// // Preflight Request Configuration
// app.options('*', cors({ origin: 'http://localhost:3000', credentials: true, optionsSuccessStatus: 200 }));
// // CORS Middleware for All Routes
// app.use(cors({ origin: 'http://localhost:3000', credentials: true, optionsSuccessStatus: 200 }));

//BODY PARSER MIDDLEWARE - allow accessing req.body
// parse application/json
app.use(express.json());
// parse application/x-www-form-urlencoded
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
