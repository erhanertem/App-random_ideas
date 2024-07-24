const express = require('express');

// TEMP DATA
const ideas = [
	{ id: 1, text: 'hello world', tag: 'software', username: 'Brunnel', date: '2022-01-01' },
	{ id: 2, text: 'saassaahello world', tag: 'toftware', username: 'Zrunnel', date: '2024-01-01' },
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

// CREATE A NEW IDEA
router.post('/', (req, res) => {
	const idea = {
		id: ideas.length + 1,
		text: req.body.text,
		tag: req.body.tag,
		username: req.body.username,
		date: new Date().toISOString().split('T')[0],
	};

	ideas.push(idea);

	res.send(req.body.text);
});

// UPDATE IDEA
router.put('/:id', (req, res) => {
	const idea = ideas.find((idea) => idea.id === Number(req.params.id));
	// GUARD CLAUSE
	if (!idea) {
		return res.status(404).json({ success: false, error: 'Resource not found' });
	}

	idea.text = req.body.text || idea.text;
	idea.tag = req.body.tag || idea.tag;

	res.json({ success: true, data: idea });
});
// DELETE IDEA

module.exports = router;
