const express = require('express');

// TEMP DATA
const ideas = [
	{ id: 1, idea: 'hello world', tag: 'software', username: 'Brunnel', date: '2022-01-01' },
	{ id: 2, idea: 'saassaahello world', tag: 'toftware', username: 'Zrunnel', date: '2024-01-01' },
];

// CREATE EXPRESS ROUTER FOR IDEAS
const router = express.Router();

// GET ALL IDEAS
router.get('/', (req, res) => {
	res.json({ success: true, data: ideas });
});
// GET A SINGLE IDEA
router.get('/:id', (req, res) => {
	const idea = ideas.find((idea) => idea.id === Number(req.params.id));

	if (!idea) {
		res.status(404).json({ success: false, error: 'Resource not found' });
	}

	res.json({ success: true, data: idea });
});

module.exports = router;
