const CONSTANTS = require('../constants');

const CREATE_ITEM_SCHEME = {
    type: 'object',
    properties: {
        _id: {type: 'string', pattern: '^[0-9a-fA-F]{24}$'},
        name: {type: 'string', minLength: 3},
        sku: { type: 'string', minLength: 3},
        code: {type: 'string'},
        quantity: { type: 'number', minimum: 0,  }
    },
    required: ['name', 'sku']
};

const OBJECTID_SCHEME = {
    type: 'object',
    properties: {
        id: { pattern: '^[0-9a-fA-F]{24}$' },
    },
}

const QUANTITY_SCHEME = {
    type: 'object',
    properties: {
        _id: {type: 'string', pattern: '^[0-9a-fA-F]{24}$'},
        quantity: { type: 'number' }
    },
    required: ['quantity', '_id']
}

const ITEM_OPERATION_SCHEME = {
    type: 'object',
    properties: {
        operation: {type: 'string', enum: [CONSTANTS.ITEM_INVENTORY_OPERATION_COME_OUT, CONSTANTS.ITEM_INVENTORY_OPERATION_GO_IN]}
    },
    required: ['operation'],
    additionalProperties: false
}
module.exports = {
    CREATE_ITEM_SCHEME,
    OBJECTID_SCHEME,
    QUANTITY_SCHEME,
    ITEM_OPERATION_SCHEME
}