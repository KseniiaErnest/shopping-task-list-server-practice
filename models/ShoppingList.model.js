const { Schema, model } = require('mongoose');

const shoppingListSchema = new Schema(
  {
    title: String,
    tasks: [{ type: Schema.Types.ObjectId, ref: 'ShoppingTask'}],
  },
  {
		timestamps: true,
	}
);

const ShoppingList = model('ShoppingList', shoppingListSchema);

module.exports = ShoppingList;