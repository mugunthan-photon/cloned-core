import sinon from 'sinon';
import BaseActionFilter from './BaseActionFilter';
import { Cookies } from '../index';

const baseActionFilter = new BaseActionFilter();

describe('BaseActionFilter Test Cases', () => {
    it('check getURLParameterBykey return value', () => {
        baseActionFilter.getURLParameterBykey('search', 'https://localhost:3000/?search=&redirectTerm=men');
        baseActionFilter.getURLParameterBykey('redirectTerm', 'https://localhost:3000/?redirectTerm=men');
    });

    it('check getFormErrorDL return value', () => {
        const errorDetails = [{
            errorDescription: 'Enter email address',
        }];
        baseActionFilter.getFormErrorDL(errorDetails);
    });
    it('check selectStoreData called with data', () => {
        baseActionFilter.selectStoreData();
        Cookies.save('userStoreInfo', '2338|Town East Mall|10.3|true');
        baseActionFilter.selectStoreData();
        Cookies.remove('userStoreInfo');
    });
    it('check getNavigationDL with isReload false', () => {
        const payload = {
            linkName: 'coupons',
            isReload: false,
        };
        baseActionFilter.getNavigationDL(payload);
    });

    it('check getNavigationDL with patload empty', () => {
        const payload = {
            isReload: false,
        };
        baseActionFilter.getNavigationDL(payload);
    });

    it('check getNavigationDL with isReload false', () => {
        const payload = {
            linkName: 'coupons',
            isReload: true,
        };
        baseActionFilter.getNavigationDL(payload);
    });

    it('check storeSearchData call', () => {
        const payload = {
            address: 'dallas',
        };
        baseActionFilter.storeSearchData(payload);
    });
    it('check videoLoadedData call', () => {
        const payload = {
            eventName: 'dallas',
            video: '',
            product: '',
        };
        baseActionFilter.videoLoadedData(payload);
    });
    it('check openModelData call', () => {
        baseActionFilter.openModelData('store - modal');
    });
    it('check updateCommonDigitalData call with null', () => {
        baseActionFilter.updateCommonDigitalData(undefined);
    });

    it('check updateCommonDigitalData with omni_profileOptin cookie Y|P,T call', () => {
        const digitalData = {};
        const test = sinon.stub(Cookies, 'load', (name) => {
            let value = null;
            switch (name) {
                case 'omni_profileOptin': {
                    value = 'Y|P,T';
                    break;
                }
                case 'omni_profileAttr': {
                    value = 'Y|Y';
                    break;
                }
                case 'omni_profileType': {
                    value = 'A|C|R-G|L';
                    break;
                }
                case 'DP_USER_STATE': {
                    value = '1';
                    break;
                }
                default: {
                    break;
                }
            }
            return value;
        });
        baseActionFilter.updateCommonDigitalData(digitalData);
        test.restore();
    });

    it('check updateCommonDigitalData with omni_profileOptin cookie VALUE|NA call', () => {
        const digitalData = {};
        const test = sinon.stub(Cookies, 'load', () => ('VALUE|NA'));
        baseActionFilter.updateCommonDigitalData(digitalData);
        test.restore();
    });
    it('check updateCommonDigitalData with omni_profileOptin cookie VALUE|N call', () => {
        const digitalData = {};
        const test = sinon.stub(Cookies, 'load', () => ('VALUE|N'));
        baseActionFilter.updateCommonDigitalData(digitalData);
        test.restore();
    });
    it('check updateCommonDigitalData with omni_profileOptin cookie VALUE call', () => {
        const digitalData = {};
        const test = sinon.stub(Cookies, 'load', () => ('VALUE | 1'));
        baseActionFilter.updateCommonDigitalData(digitalData);
        test.restore();
    });
    it('check updateCommonDigitalData with omni_profileOptin cookie VALUE call', () => {
        const digitalData = {};
        const test = sinon.stub(Cookies, 'load', () => ('Y|T'));
        baseActionFilter.updateCommonDigitalData(digitalData);
        test.restore();
    });
    it('check updateCommonDigitalData with omni_profileOptin cookie VALUE call', () => {
        const digitalData = {};
        const test = sinon.stub(Cookies, 'load', () => ('Y|P'));
        baseActionFilter.updateCommonDigitalData(digitalData);
        test.restore();
    });

    it('check getPendingNavigationDL with isReload false', () => {
        baseActionFilter.getPendingNavigationDL();
        const test = sinon.stub(Cookies, 'load', () => ('coupons'));
        baseActionFilter.getPendingNavigationDL();
        test.restore();
    });

    describe('getViewportSize fn helper test cases', () => {
        const myWindow = {
            innerWidth: '',
        };
        it('return empty string for no param', () => {
            myWindow.innerWidth = 599;
            baseActionFilter.getViewportSize();
        });
        it('return small for mobile', () => {
            myWindow.innerWidth = 599;
            baseActionFilter.getViewportSize(myWindow);
        });
        it('return medium for tablet', () => {
            myWindow.innerWidth = 600;
            baseActionFilter.getViewportSize(myWindow);
        });
        it('return large for desktop', () => {
            myWindow.innerWidth = 1439;
            baseActionFilter.getViewportSize(myWindow);
        });
        it('return x-large for sizes greater than desktop', () => {
            myWindow.innerWidth = 1440;
            baseActionFilter.getViewportSize(myWindow);
        });
    });
});
