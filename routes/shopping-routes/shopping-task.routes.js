const express = require("express");
const router = express.Router();
const ShoppingTask = require("../../models/ShoppingTask.model");
const ShoppingList = require('../../models/ShoppingList.model');

// CREATE
router.post('/', (req, res) => {
  const { task, items, isComplete, shoppingListId } = req.body;

  ShoppingTask.create({ task, items, isComplete, shoppingList: shoppingListId })
  .then((shoppingTask) => {
    return ShoppingList.findByIdAndUpdate(shoppingListId, { $push: { tasks: shoppingTask._id } });
  })
  .then(response => res.json({success: true, response}))
  .catch((err) => {
    res.json({success: false, error: err});
  });
});

// READ
router.get('/', (req, res) => {
  ShoppingTask.find()
  .then((shoppingTasks) => {
    res.json({success: true, shoppingTasks});
  })
  .catch((err) => {
    res.json({success: false, error: err});
  })
});

// READ ONE
router.get('/:shoppingTaskId', (req, res) => {
  ShoppingTask.findById(req.params.shoppingTaskId)
  .then((shoppingTask) => {
    res.json({success: true, shoppingTask});
  })
  .catch((err) => {
    res.json({success: false, error: err});
  })
});

// UPDATE
router.put('/:shoppingTaskId', (req, res) => {
  ShoppingTask.findByIdAndUpdate(req.params.shoppingTaskId, req.body, { new: true })
  .then((shoppingTask) => {
    res.json({ success: true, shoppingTask});
  })
  .catch((err) => {
    res.json({ success: false, error: err});
  })
});

// DELETE
router.delete('/:shoppingTaskId', (req, res) => {
  ShoppingTask.findByIdAndRemove(req.params.shoppingTaskId)
  .then(() => {
    res.json({success: true, message: 'Successfully removed shopping task'});
  })
  .catch((err) => {
    res.json({success: false, error: err});
  })
});

module.exports = router;
