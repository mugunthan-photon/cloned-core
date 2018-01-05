import isEmpty from 'lodash/isEmpty';
import Cookies from '../Cookies/Cookies';

/* istanbul ignore next - JSDOM does not support and this is development tool */
class LocalStorage {
    static yodaStoreKey = '__yoda';

    constructor() {
        this.localStorageSupport = LocalStorage.isLocalStorageSupported();
    }

    static isLocalStorageSupported() {
        const testData = 'testData';
        try {
            localStorage.setItem(testData, testData);
            localStorage.removeItem(testData);
            return true;
        } catch (e) {
            return false;
        }
    }
    // storeWithKey - Pass this parameter as true if you want to store data with the same key.
    setData(key, value, storeWithKey) {
        // If it is server side rendering component, simply return null as localStorage object is not available.
        if (__SERVER__) {
            return null;
        }
        let isSuccess = false;

        if (this.localStorageSupport) {
            if (storeWithKey) {
                localStorage.setItem(key, JSON.stringify(value));
            } else {
                const yodaStore = this.getYodaStore();
                yodaStore[key] = value;

                localStorage.setItem(LocalStorage.yodaStoreKey, JSON.stringify(yodaStore));
            }

            isSuccess = true;
        } else {
            Cookies.save(key, JSON.stringify(value));
            isSuccess = false;

            console.error('localStorage is not available!');
        }

        return isSuccess;
    }

    getYodaStore() {
        if (this.localStorageSupport) {
            const yodaStore = localStorage.getItem(LocalStorage.yodaStoreKey);
            return (yodaStore !== 'null' && !isEmpty(yodaStore)) ? JSON.parse(yodaStore) : {};
        }
        return {};
    }

    getData(key, retrieveWithKey) {
        // If it is server side rendering component, simply return null as localStorage object is not available.
        if (__SERVER__) {
            return null;
        }
        let value = null;

        if (this.localStorageSupport) {
            if (retrieveWithKey) {
                value = localStorage.getItem(key);
            } else {
                const localStorageMap = this.getYodaStore();
                value = !isEmpty(localStorageMap) ? localStorageMap[key] : null;
            }
        } else {
            value = Cookies.load(key);
            console.error('localStorage is not available!');
        }

        value = value && value === 'null' ? null : value;

        return value || null;
    }

    removeData(key, withKey) {
        if (this.localStorageSupport) {
            if (withKey) {
                localStorage.removeItem(key);
            } else {
                const yodaStore = this.getYodaStore();
                if (yodaStore[key]) {
                    delete yodaStore[key];
                    localStorage.setItem(LocalStorage.yodaStoreKey, JSON.stringify(yodaStore));
                }
            }
        } else {
            Cookies.remove(key);
        }
    }
}

export default new LocalStorage();
