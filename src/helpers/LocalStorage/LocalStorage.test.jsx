import { after, before, describe, it } from 'mocha';
import { expect } from 'chai';
import LocalStorage from './LocalStorage';

describe('LocalStorage', () => {
    describe('should be able to get and set string data for', () => {
        const sampleData = 10;

        it.skip('LocalStorage::SetData()', () => {
            expect(LocalStorage.setData('sampleData', sampleData)).to.equal(true);
        });

        it.skip('LocalStorage::GetData()', () => {
            expect(LocalStorage.getData('sampleData')).to.deep.equal(sampleData);
        });
    });

    describe('should be able to get and set object data for', () => {
        const sampleData = {
            a: 10,
            b: 20,
        };

        it.skip('LocalStorage::SetData()', () => {
            expect(LocalStorage.setData('sampleData', sampleData)).to.equal(true);
        });

        it.skip('LocalStorage::GetData()', () => {
            expect(LocalStorage.getData('sampleData')).to.deep.equal(sampleData);
        });
    });

    describe('should be able to get and set unknown data for', () => {
        const sampleData = undefined;

        it.skip('LocalStorage::SetData()', () => {
            expect(LocalStorage.setData('sampleData', sampleData)).to.equal(true);
        });

        it.skip('LocalStorage::GetData()', () => {
            expect(LocalStorage.getData('sampleData')).to.equal(sampleData);
        });
    });

    describe('removeData is working', () => {
        const sampleData = {
            a: 10,
            b: 20,
        };

        it.skip('LocalStorage::SetData()', () => {
            expect(LocalStorage.setData('sampleData', sampleData)).to.equal(true);
        });

        it.skip('LocalStorage:RemoveData', () => {
            expect(LocalStorage.removeData('sampleData', sampleData));
        });

        it.skip('LocalStorage::GetData()', () => {
            expect(LocalStorage.getData('sampleData')).to.not.deep.equal(sampleData);
        });
    });

    describe('should fail when LocalStorage is not available', () => {
        const LocalStorageRef = global.window.localStorage;
        const sampleData = 10;

        before(() => {
            global.window.localStorage = undefined;
            global.localStorage = undefined;
        });

        after(() => {
            global.window.localStorage = LocalStorageRef;
            global.localStorage = LocalStorageRef;
        });

        it.skip('LocalStorage::SetData()', () => {
            expect(() => {
                LocalStorage.setData('sampleData', sampleData);
            }).to.throw(Error);
        });

        it.skip('LocalStorage::GetData()', () => {
            expect(() => {
                LocalStorage.getData('sampleData', sampleData);
            }).to.throw(Error);
        });
    });
});
