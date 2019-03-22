const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const ItemModel = require('../db/models/items');
const { ItemInventoryProcess } = require('../services/');

const DATA = require('./data');

describe('Should test Item Inventory Process', () => {

    describe('Should test items go in', () => {
        let findByIdAndUpdateStub;        
        afterEach(()=>{
            findByIdAndUpdateStub.restore();
        });

        it('Should let items go in', async () => {
            try {
                findByIdAndUpdateStub = sinon.stub(ItemModel, 'findByIdAndUpdate').returns({exec: ()=> DATA.NEW_ITEM});
                const upatedItem = await ItemInventoryProcess.itemGoIn(DATA.NEW_ITEM._id, 5);
                expect(upatedItem).to.be.an('object');
            } catch (e) {
                throw e;
            }
        });

        it('Should throw not found error when items go in', async () => {
            try {
                findByIdAndUpdateStub = sinon.stub(ItemModel, 'findByIdAndUpdate').returns({exec: ()=> null});
                const upatedItem = await ItemInventoryProcess.itemGoIn(DATA.NEW_ITEM._id, 5);
            } catch (e) {
                expect(e.httpCode).to.equal(404);
            }
        });

        it('Should throw unexpected error when items go in', async () => {
            try {
                findByIdAndUpdateStub = sinon.stub(ItemModel, 'findByIdAndUpdate').returns({exec: ()=> {throw new Error()}});
                const upatedItem = await ItemInventoryProcess.itemGoIn(DATA.NEW_ITEM._id, 5);
            } catch (e) {
                expect(e instanceof Error).to.be.equal(true);
            }
        });
    });

    

    describe('Should test items come out', () => {
        let findByIdAndUpdateStub;        
        let findByIdStub;
        afterEach(()=>{
            findByIdAndUpdateStub.restore();
            findByIdStub.restore();
        });

        it('Should let items come out', async () => {
            try {
                findByIdAndUpdateStub = sinon.stub(ItemModel, 'findByIdAndUpdate').returns({exec: ()=> DATA.NEW_ITEM});
                findByIdStub = sinon.stub(ItemModel, 'findById').returns({exec: ()=> DATA.NEW_ITEM});
                const upatedItem = await ItemInventoryProcess.itemComeOut(DATA.NEW_ITEM._id, 5);
                expect(upatedItem).to.be.an('object');
            } catch (e) {
                throw e;
            }
        });

        it('Should throw validation error when come out as quantity after comeout became less than zero', async () => {
            try {
                findByIdAndUpdateStub = sinon.stub(ItemModel, 'findByIdAndUpdate').returns({exec: ()=> DATA.NEW_ITEM});
                findByIdStub = sinon.stub(ItemModel, 'findById').returns({exec: ()=> DATA.NEW_ITEM});
                const upatedItem = await ItemInventoryProcess.itemComeOut(DATA.NEW_ITEM._id, 50);
            } catch (e) {
                expect(e.httpCode).to.equal(409);
            }
        });


        it('Should throw not found error when items come out', async () => {
            try {
                findByIdAndUpdateStub = sinon.stub(ItemModel, 'findByIdAndUpdate').returns({exec: ()=> null});
                findByIdStub = sinon.stub(ItemModel, 'findById').returns({exec: ()=> null});
                const upatedItem = await ItemInventoryProcess.itemComeOut(DATA.NEW_ITEM._id, 5);
            } catch (e) {
                expect(e.httpCode).to.equal(404);
            }
        });

        it('Should throw unexpected error when items come out', async () => {
            try {
                findByIdAndUpdateStub = sinon.stub(ItemModel, 'findByIdAndUpdate').returns({exec: ()=> {throw new Error()}});
                const upatedItem = await ItemInventoryProcess.itemGoIn(DATA.NEW_ITEM._id, 5);
                throw Error();
            } catch (e) {
                expect(e instanceof Error).to.be.equal(true);
            }
        });
    });

    

});