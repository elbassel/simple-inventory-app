const _ = require('lodash');
const Item = require('../db/models/items');
const { DuplicateObjectError, NotFoundError } = require('../utils/errors');

class ItemService{
    static async addNewItem(item) {
        try {
            const existingItem = await Item.findOne({name: item.name}).exec();
            if(!_.isNil(existingItem))
                throw new DuplicateObjectError('An item with the same name exist');
            return await Item.create(item);
        } catch(e) {
            throw e;
        }
    }

    static async deleteItem(itemId) {
        try {
            const item = await Item.findByIdAndDelete(itemId).exec();
            this.validateItemExitence({_id: itemId});
            return item;
        } catch(e) {
            throw e;
        }
    }

    static async updateItem(item) {
        try {
            const updatedItem = await Item.findByIdAndUpdate(item._id, item).exec();
            this.validateItemExitence(updatedItem);
            return item;
        } catch(e) {
            throw e;
        }
    }

    static async getItems(item = {}) {
        try {
            return Item.find(item).exec();
        } catch (e) {
            throw e;
        }
    }

    static validateItemExitence(item) {
        try {
            if (_.isNil(item)) throw new NotFoundError('Item does not exist');
        } catch (e) {
            throw e;
        }
    }
}

module.exports = ItemService;