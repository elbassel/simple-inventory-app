const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const ItemModel = require('../db/models/items');
const { ItemService } = require('../services/');

const DATA = require('./data');

describe('Should test ItemService', async () => {

    describe('Should test adding a new item', async () => {
        let itemCreateStub;        
        let findOneItemStub;
        afterEach(()=>{
            itemCreateStub.restore();
            findOneItemStub.restore();
        });
      it('Should add a new item', async () => {
        try {
            itemCreateStub = sinon.stub(ItemModel, 'create').returns({_id: 'new id'});
            findOneItemStub  = sinon.stub(ItemModel, 'findOne').returns({exec: ()=> null});
            const newItem = await ItemService.addNewItem(DATA.NEW_ITEM);
            expect(newItem).to.be.an('object')
        } catch (e) {
            throw e;        
        }
      });

      it("Shouldn't add an item with duplicate name ", async () => {
        try {
            itemCreateStub = sinon.stub(ItemModel, 'create').returns({_id: 'new id'});
            itemFindOne  = sinon.stub(ItemModel, 'findOne').returns({exec: ()=> DATA.NEW_ITEM});
            const newItem = await ItemService.addNewItem(DATA.NEW_ITEM);
        } catch (e) {
            expect(e.httpCode).to.equal(409);
        }
      });
    });

    describe('Should test delete an item', async () => {
        let findOneItemStub;
        afterEach(()=>{
            findByIdAndDeleteStub.restore();
        });

        it('Should delete an existing item', async () => {
            try {
                findByIdAndDeleteStub = sinon.stub(ItemModel, 'findByIdAndDelete').returns({exec: ()=> DATA.NEW_ITEM});
                const deletedItem = await ItemService.deleteItem();
                expect(deletedItem).to.be.an('object')
            } catch (e) {
                throw e;
            }
        });
        it('Should throw not found error when delete an existing item', async () => {
            try {
                findByIdAndDeleteStub = sinon.stub(ItemModel, 'findByIdAndDelete').returns({exec: ()=> null});
                await ItemService.deleteItem();
            } catch (e) {
                expect(e.httpCode).to.equal(404);
            }
        });

        it('Should throw unexpected error when delete an existing item', async () => {
            try {
                findByIdAndDeleteStub = sinon.stub(ItemModel, 'findByIdAndDelete').returns({exec: ()=> {throw new Error()}});
                await ItemService.deleteItem();
            } catch (e) {
                expect(e instanceof Error).to.be.equal(true);
            }
        });
    });

    describe('Should test updating an item', async () => {
        let findByIdAndUpdateStub, findOneItemStub;        
        afterEach(()=>{
            findByIdAndUpdateStub.restore();
            findOneItemStub.restore();
        });
        it('Should update an item', async ()=> {
            try {
                findByIdAndUpdateStub = sinon.stub(ItemModel, 'findByIdAndUpdate').returns({exec: ()=> DATA.NEW_ITEM});
                findOneItemStub  = sinon.stub(ItemModel, 'findOne').returns({exec: ()=> null});
                const udatedItem = await ItemService.updateItem(DATA.NEW_ITEM);
                expect(udatedItem).to.be.an('object')
            } catch (e) {
                throw e;
            }
        });

        it('Should update an item with a name already exist before', async ()=> {
            try {
                findByIdAndUpdateStub = sinon.stub(ItemModel, 'findByIdAndUpdate').returns({exec: ()=> DATA.NEW_ITEM});
                findOneItemStub  = sinon.stub(ItemModel, 'findOne').returns({exec: ()=> {
                    return {_id: 'fakeId', name: DATA.NEW_ITEM.name}
                }});
                const udatedItem = await ItemService.updateItem(DATA.NEW_ITEM);
                expect(udatedItem).to.be.an('object')
            } catch (e) {
                expect(e.httpCode).to.equal(409);
            }
        });

        it('Should throw not found error when update an item', async ()=> {
            try {
                findByIdAndUpdateStub = sinon.stub(ItemModel, 'findByIdAndUpdate').returns({exec: ()=> null});
                findOneItemStub  = sinon.stub(ItemModel, 'findOne').returns({exec: ()=> null});
                const udatedItem = await ItemService.updateItem(DATA.NEW_ITEM);
            } catch (e) {
                expect(e.httpCode).to.equal(404);
            }
        });

        it('Should throw unexpected error when update an existing item', async () => {
            try {
                findByIdAndUpdateStub = sinon.stub(ItemModel, 'findByIdAndUpdate').returns({exec: ()=> {throw new Error()}});
                await ItemService.updateItem();
            } catch (e) {
                expect(e instanceof Error).to.be.equal(true);
            }
        });
    });

    describe('Should get all items', async () => {
        afterEach(() =>{
            findStub.restore();
        });
        it('Should get all items', async () => {
            try {
                const returns = {
                    sort: ()=> {
                        return {exec: ()=> []}
                    }
                }
                findStub = sinon.stub(ItemModel, 'find').returns(returns);
                const items = await ItemService.getItems();
                expect(items).to.be.an('array');
            } catch (e) {
                throw e;
            }
        })

        it('Should throw an error', async () => {
            try {
                findStub = sinon.stub(ItemModel, 'find').returns({exec: ()=> {throw new Error()}});
                const items = await ItemService.getItems();
                expect(items).to.be.an('array');
            } catch (e) {
                expect(e instanceof Error).to.be.equal(true);
            }
        })
    });

    describe('Should test get item by id', async () => {
        afterEach(() =>{
            findStub.restore();
        });
        it('Should test get item by id', async () => {
            try {
                const returns = {
                    sort: ()=> {
                        return {exec: ()=> [DATA.NEW_ITEM]}
                    }
                }
                findStub = sinon.stub(ItemModel, 'find').returns(returns);
                const items = await ItemService.getItemById(DATA.NEW_ITEM._id);
                expect(items).to.be.an('object');
            } catch (e) {
                throw e;
            }
        })

        it('Should throw not found error', async () => {
            try {
                const returns = {
                    sort: ()=> {
                        return {exec: ()=> []}
                    }
                }
                findStub = sinon.stub(ItemModel, 'find').returns(returns);
                const items = await ItemService.getItemById(DATA.NEW_ITEM._id);
            } catch (e) {
                expect(e.httpCode).to.equal(404);
            }
        })
    });    
  });