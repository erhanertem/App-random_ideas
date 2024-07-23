const express = require('express');

const ideasRouter = require('./routes/ideas');

const PORT = 5000;

// > INSTANTIATE EXPRESS APP
const app = express();

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
