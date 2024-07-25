const express = require('express');

const Idea = require('../models/Idea');

// CREATE EXPRESS ROUTER FOR IDEAS
const router = express.Router();

// GET ALL IDEAS
router.get('/', async (req, res) => {
	try {
		const allIdeas = await Idea.find();
		res.json({ success: true, data: allIdeas });
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ success: false, error: 'Server Error' });
	}
});
// GET A SINGLE IDEA
router.get('/:id', async (req, res) => {
	try {
		const idea = await Idea.findById(req.params.id);
		// GUARD CLAUSE
		if (!idea) {
			return res.status(404).json({ success: false, error: 'Resource not found' });
		}
		res.json({ success: true, data: idea });
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ success: false, error: 'Server Error' });
	}
});

// ADD AN IDEA
router.post('/', async (req, res) => {
	const idea = new Idea({
		text: req.body.text,
		tag: req.body.tag,
		username: req.body.username,
	});

	try {
		const savedIdea = await idea.save();
		res.json({ success: true, data: savedIdea });
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ success: false, error: 'Server Error' });
	}
});

// UPDATE AN IDEA
router.put('/:id', async (req, res) => {
	try {
		const updatedIdea = await Idea.findByIdAndUpdate(
			req.params.id,
			{ $set: { text: req.body.text, tag: req.body.tag } },
			{ new: true }
		);
		// GUARD CLAUSE
		if (!updatedIdea) {
			return res.status(404).json({ success: false, error: 'Resource not found' });
		}
		res.json({ success: true, data: updatedIdea });
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ success: false, error: 'Server Error' });
	}
});

// DELETE IDEA
router.delete('/:id', async (req, res) => {
	try {
		// await Idea.findOneAndDelete({ _id: req.params.id }); //Below method is d shorthand method
		const deletedIdea = await Idea.findByIdAndDelete(req.params.id);
		// GUARD CLAUSE
		if (!deletedIdea) {
			return res.status(404).json({ success: false, error: 'Resource not found' });
		}
		res.json({ success: true, data: {} });
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ success: false, error: 'Server Error' });
	}
});

// DELETE ALL IDEAS
router.delete('/', async (req, res) => {
	try {
		const deleteAction = await Idea.deleteMany();
		console.log(deleteAction);
		res.json({ success: true });
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ success: false, error: 'Server Error' });
	}
});
module.exports = router;
