const express = require('express');
const router = express.Router();
const Item = require('../models/item');

router.get('/', async (req, res) => {
	try {
		const items = await Item.find()
		res.json(items)
	} catch (err) {
		res.json(err)
	}
})

router.get('/:id', async(req,res) => {
	try {
		const item = await Item.findById(req.params.id)
		res.json(item)
	} catch (err) {
		res.json(err)
	}
})
// Post
router.post('/save',  async(req, res) => {
	const item = new Item({
		name:req.body.name
	})
	try {
		const savedItem = await item.save()
		res.json(savedItem)
	} catch (err) {
		res.json(err)
	}
});

router.patch('/:id', async (req,res) => {
	const itemInfo = {name: req.body.name}
	try {
	const updatedItem = await Item.findByIdAndUpdate(req.params.id, {$set: itemInfo}, {new: true})
	res.json(updatedItem)
	} catch (err) {
		res.json(err)
	}
})

router.delete('/:id', async(req,res) => {
	try {
	const deletedItem = await Item.findByIdAndDelete(req.params.id)
	res.json({success:true, deletedItem})
	} catch (err) {
		res.json(err)
	}
})


module.exports = router;


























// const express = require('express');
// const Item = require('../../models/Item');
// const router = express.Router();

// // Get Item
// router.get('/', (req, res) => {
// 	Item.find().sort({ date: -1 }).then((item) => res.json(item));
// });

// // Post Item
// router.post('/', (req, res) => {
// 	const newItem = new Item({
// 		name: req.body.name
// 	});
// 	newItem.save().then((item) => {
// 		console.log(`Feedback: ${item}`), res.json(item);
// 	});
// });

// // Delete Item
// router.delete('/:id', (req, res) => {
// 	Item.findById(req.params.id)
// 		.then((item) =>
// 			item.remove().then(() => {
// 				console.log('Item Deleted'), res.json({ success: true });
// 			})
// 		)
// 		.catch((err) => {
// 			console.log('Failed Deleting Item'), res.status(404).json({ success: false });
// 		});
// });
// module.exports = router;
