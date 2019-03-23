const Item = require('../db/models/items');
const ItemService = require('./ItemService')
const { 
    BusinessValidationError 
} = require('../utils/errors');

class ItemInventoryProcess {
    static async itemGoIn(itemId, goInQuantity) {
        try {
            const item = await Item.findByIdAndUpdate(itemId, { $inc : { quantity: goInQuantity } },  {new: true}) ;
            ItemService.validateItemExitence(item);
            return item;
        } catch (e) {
            throw e;
        }
    }

    static async itemComeOut(itemId, comeOutQuantity) {
        try {
            const existingItem = await Item.findById(itemId).exec();
            ItemService.validateItemExitence(existingItem);
            existingItem.quantity -= comeOutQuantity;
            if (existingItem.quantity < 0) {
                throw new BusinessValidationError('If this quantity comes out, item quantity will be less than zero');
            }
            const item = await Item.findByIdAndUpdate(itemId, { $inc : { quantity: -comeOutQuantity } }, {new: true}) ;

            return item;
        } catch (e) {
            throw e;
        }
    }
    
}

module.exports = ItemInventoryProcess;