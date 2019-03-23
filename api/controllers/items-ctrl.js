const router = require('express').Router();
const ajv = require('ajv');
const { ItemInventoryProcess, ItemService } = require('../services');
const CONSTANTS = require('../utils/constants');
const { 
    CREATE_ITEM_SCHEME, 
    OBJECTID_SCHEME,
    QUANTITY_SCHEME,
    ITEM_OPERATION_SCHEME
} = require('../utils/validations/items');
const { FormatValidationError } = require('../utils/errors');
const Validator = new ajv();
 
router.post('/', async (req, res, next) => {
    try {
        const valid = Validator.validate(CREATE_ITEM_SCHEME, req.body);
        if(!valid){
            throw new FormatValidationError(Validator.errors);
        }
        const newItem = await ItemService.addNewItem(req.body);
        res.send(newItem);
    } catch (e) {
        next(e);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const valid = Validator.validate(OBJECTID_SCHEME, req.params);
        if(!valid){
            throw new FormatValidationError(Validator.errors);
        }
        await ItemService.deleteItem(req.params.id);
        res.status(200).send();
    } catch (e) {
        next(e);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const items = await ItemService.getItems({});
        res.send(items);
    } catch (e) {
        next(e);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const items = await ItemService.getItemById(req.params.id);
        res.send(items);
    } catch (e) {
        next(e);
    }
});


router.put('/:id', async (req, res, next) => {
    try {
        const item = {
            _id: req.params.id,
            ...req.body
        };
        const valid = Validator.validate(CREATE_ITEM_SCHEME, req.body);
        if(!valid){
            throw new FormatValidationError(Validator.errors);
        }
 
        const updatedItem = await ItemService.updateItem(item);
        res.send(updatedItem);
    } catch (e) {
        next(e);
    }
});

router.patch('/:id/quantity', async (req, res, next) => {
    try {
        let valid = Validator.validate(QUANTITY_SCHEME, {_id: req.params.id, quantity: req.body.quantity});
        if(!valid){
            throw new FormatValidationError(Validator.errors);
        }
        valid = Validator.validate(ITEM_OPERATION_SCHEME, req.query);
        if(!valid){
            throw new FormatValidationError(Validator.errors);
        }

        let item;
        switch(req.query[CONSTANTS.ITEM_INVENTORY_OPERATION]) {
            case CONSTANTS.ITEM_INVENTORY_OPERATION_GO_IN: 
                item = await ItemInventoryProcess.itemGoIn(req.params.id, req.body.quantity);
                break;
            case CONSTANTS.ITEM_INVENTORY_OPERATION_COME_OUT:
                item = await ItemInventoryProcess.itemComeOut(req.params.id, req.body.quantity);
                break;
        }
        res.send(item);
    } catch (e) {
        next(e);
    }
})

module.exports = router;
