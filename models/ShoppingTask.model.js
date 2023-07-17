const { Schema, model } = require('mongoose');

const shoppingTaskSchema = new Schema(
  {
    task: String,
    items: [String],
    isComplete: Boolean,
    shoppingList: { type: Schema.Types.ObjectId, ref: 'ShoppingList'}
  },
  {
		timestamps: true,
	}
);

const ShoppingTask = model('ShoppingTask', shoppingTaskSchema);

module.exports = ShoppingTask;