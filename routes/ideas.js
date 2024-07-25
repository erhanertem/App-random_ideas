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
		const idea = await Idea.findById(req.params.id);

		// EXTRA PRECAUTION ENVELOPING THE DELETE LOGIC BY ASKING FOR USERNAME CONFIRMATION INPUT, IF THE USERNAME  OF THE DELETE-ID IS MATCHED BY THE USER INPUT, PROCEEDS W/ DELETE OPERATION ELSE ...
		if (idea.username.toLowerCase() === req.body.username.toLowerCase()) {
			const updatedIdea = await Idea.findByIdAndUpdate(
				req.params.id,
				{ $set: { text: req.body.text, tag: req.body.tag } },
				{ new: true }
			);

			return res.json({ success: true, data: updatedIdea });
		}
		// User fails to approve by typing this username
		res.status(403).json({
			success: false,
			error: 'Updating the resource is not authorized. Provide matching credential.',
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ success: false, error: 'Server Error' });
	}
});

// DELETE IDEA
router.delete('/:id', async (req, res) => {
	try {
		const idea = await Idea.findById(req.params.id);

		// EXTRA PRECAUTION ENVELOPING THE DELETE LOGIC BY ASKING FOR USERNAME CONFIRMATION INPUT, IF THE USERNAME  OF THE DELETE-ID IS MATCHED BY THE USER INPUT, PROCEEDS W/ DELETE OPERATION ELSE ...
		if (idea.username.toLowerCase() === req.body.username.toLowerCase()) {
			// await Idea.findOneAndDelete({ _id: req.params.id }); //Below method is d shorthand method
			await Idea.findByIdAndDelete(req.params.id);
			return res.json({ success: true, data: {} });
		}
		// User fails to approve by typing this username
		res.status(403).json({
			success: false,
			error: 'Deleting the resource was not authorized. Provide matching credential.',
		});
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
