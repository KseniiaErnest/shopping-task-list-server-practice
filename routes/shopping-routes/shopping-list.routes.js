const express = require('express');
const router = express.Router();
const ShoppingList = require('../../models/ShoppingList.model');
const ShoppingTask = require("../../models/ShoppingTask.model");

// CREATE
router.post('/', (req, res) => {
  ShoppingList.create(req.body)
  .then((shoppingList) => {
    res.json({success: true, shoppingList});
  })
  .catch((err) => {
    res.json({success: false, error: err});
  });
});

// READ
router.get('/', (req, res) => {
  ShoppingList.find()
  .populate('tasks')
  .then((shoppingLists) => {
    res.json({success: true, shoppingLists});
  })
  .catch((err) => {
    res.json({success: false, error: err});
  })
});

// READ ONE
router.get('/:shoppingListId', (req, res) => {
  ShoppingList.findById(req.params.shoppingListId)
  .then((shoppingList) => {
    res.json({success: true, shoppingList});
  })
  .catch((err) => {
    res.json({success: false, error: err});
  })
});

// UPDATE
router.put('/:shoppingListId', (req, res) => {
  ShoppingList.findByIdAndUpdate(req.params.shoppingListId, req.body, { new: true })
  .then((shoppingList) => {
    res.json({ success: true, shoppingList});
  })
  .catch((err) => {
    res.json({ success: false, error: err});
  })
});

// DELETE
router.delete('/:shoppingListId', (req, res) => {
  ShoppingList.findByIdAndRemove(req.params.shoppingListId)
  .then(() => {
    res.json({success: true, message: 'Successfully removed shopping list'});
  })
  .catch((err) => {
    res.json({success: false, error: err});
  })
});

module.exports = router;
