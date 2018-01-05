import { expect } from 'chai';
import Formatter from './Formatter';

describe('Formatter Test Cases', () => {
    it('Check formatOrderNumber', () => {
        const orderNumber = '2017054580074684';
        const formattedOrderNumber = '2017 0545 8007 4684';
        expect(Formatter.format(orderNumber, Formatter.TYPE.ORDER_NUMBER)).to.equal(formattedOrderNumber);
    });

    it('Check invalid formatter', () => {
        const test = 'test';
        const formatted = 'test';
        expect(Formatter.format(test, Formatter.TYPE.UNKNOWN)).to.equal(formatted);
    });

    it('Check order null', () => {
        const test = null;
        const formatted = null;
        expect(Formatter.format(test, Formatter.TYPE.ORDER_NUMBER)).to.equal(formatted);
    });

    it('Check phone null', () => {
        const test = null;
        const formatted = null;
        expect(Formatter.format(test, Formatter.TYPE.PHONE)).to.equal(formatted);
    });

    it('Check phone random or invalid', () => {
        const test = 'Not a number';
        const formatted = 'Not a number';
        expect(Formatter.format(test, Formatter.TYPE.PHONE)).to.equal(formatted);
    });

    it('Check url formatting', () => {
        const testUrl = 'http://m.jcpenney.com/sample-image.gif';
        const formattedUrl = '/sample-image.gif';
        expect(Formatter.format(testUrl, Formatter.TYPE.AS_RELATIVE_URL)).to.equal(formattedUrl);
    });

    it('Check url null', () => {
        const testUrl = null;
        const formattedUrl = null;
        expect(Formatter.format(testUrl, Formatter.TYPE.AS_RELATIVE_URL)).to.equal(formattedUrl);
    });

    it('Check url format random string', () => {
        const testUrl = 'random string not matching url';
        const formattedUrl = 'random string not matching url';
        expect(Formatter.format(testUrl, Formatter.TYPE.AS_RELATIVE_URL)).to.equal(formattedUrl);
    });

    it('Check phone formatting', () => {
        const test = '7345656565';
        const formatted = '(734) 565-6565';
        expect(Formatter.format(test, Formatter.TYPE.PHONE)).to.equal(formatted);
    });
});
