import { beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';
import { assert, spy } from 'sinon';
import PerformanceHelper from './PerformanceHelper';

describe('PerformanceHelper', () => {
    it.skip('is a valid instance of PerformanceHelper', () => {
        expect(new PerformanceHelper()).to.be.an.instanceof(PerformanceHelper);
    });

    describe('has valid', () => {
        beforeEach(() => {
            this.performanceHelper = new PerformanceHelper();
        });

        it.skip('method isSlowNetwork()', () => {
            expect(this.performanceHelper).to.have.property('isSlowNetwork');
            expect(typeof this.performanceHelper.isSlowNetwork).equals('function');

            const isSlowNetworkSpy = spy(this.performanceHelper.__proto__, 'isSlowNetwork'); // eslint-disable-line
            const isSlowNetworkPromise = this.performanceHelper.isSlowNetwork();

            assert.calledOnce(isSlowNetworkSpy);
            expect(isSlowNetworkPromise).to.be.an.instanceof(Promise);
            isSlowNetworkSpy.restore();
        });

        it.skip('method getMetrics()', () => {
            expect(this.performanceHelper).to.have.property('getMetrics');
            expect(typeof this.performanceHelper.getMetrics).equals('function');

            const getMetricsSpy = spy(this.performanceHelper.__proto__, 'getMetrics');// eslint-disable-line
            this.performanceHelper.getMetrics();

            assert.calledOnce(getMetricsSpy);

            getMetricsSpy.restore();
        });
    });

    describe('should degrade gracefully', () => {
        it.skip('and throws exception on server side', () => {
            const isServerSide = global.__SERVER__;
            global.__SERVER__ = true;

            expect(() => {
                (new PerformanceHelper()); // eslint-disable-line no-new
            }).to.throw(Error);

            global.__SERVER__ = isServerSide;
        });

        it.skip('should throw exception when unavailable', () => {
            const performance = Object.assign(true, {}, global.performance);

            expect(() => {
                global.performance.timing = undefined;
                new PerformanceHelper();// eslint-disable-line
            }).to.throw(Error);

            global.performance = performance;
        });

        it.skip('should not throw an exception when calling isSlowNetwork before domLoadComplete', () => {
            this.timeout(10000);

            expect(() => {
                global.performance.timing.domContentLoadedEventEnd = undefined;
                (new PerformanceHelper()).isSlowNetwork();
            }).to.not.throw(Error);
        });
    });
});
