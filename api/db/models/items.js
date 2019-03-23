var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
  name:  {type: String},
  sku: {type: String},
  code:   {type: String},
  quantity: {type: Number, default: 0}
}, {timestamps: true});

itemSchema.index({ name: 1, sku: 1, code: 1, name: 'text' });
const Item = mongoose.model('Item', itemSchema);
module.exports = Item;