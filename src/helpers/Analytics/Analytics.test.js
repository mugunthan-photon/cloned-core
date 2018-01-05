import { after, before } from 'mocha';
import sinon from 'sinon';
import { expect } from 'chai';
import analytics from './Analytics';

describe('Analytics Test Cases', () => {
    let navigationClickData = null;
    before(() => {
        navigationClickData = {
            page: {
                pageInfo: {
                    linkName: 'coupons',
                },
            },
        };
    });
    it('Check init getting called without config', () => {
        analytics.hasInitialised = false;
        const init = sinon.spy(analytics, 'init');
        analytics.init(undefined);
        init.restore();
        sinon.assert.calledOnce(init);
    });
    it('Check init getting called with config', () => {
        analytics.hasInitialised = false;
        const init = sinon.spy(analytics, 'init');
        const config = {
            jqueryUrl: '<!-- @yoda_config jquery_url -->',
            ensightenUrl: '<!-- @yoda_config ensighten_dev_url -->',
        };
        analytics.init(config);
        init.restore();
        sinon.assert.calledWith(init, config);
    });

    it('call track if Bootstrap.js is not ready', () => {
        analytics.track('digitalDataReady', {});
        const eventQueue = { eventName: 'digitalDataReady', digitalData: null };
        expect(analytics.eventQueue).to.have.deep.property('[0]').that.deep.equals(eventQueue);
    });

    it('call track if Bootstrap.js is ready', () => {
        const track = sinon.spy(analytics, 'track');
        analytics.eventQueue = [];
        analytics.track('digitalDataReady', {});
        track.restore();
        sinon.assert.calledOnce(track);
    });

    it('call track without digitalData', () => {
        const track = sinon.spy(analytics, 'track');
        analytics.track('digitalDataReady', undefined);
        track.restore();
        sinon.assert.calledOnce(track);
    });

    it('call track without eventName and digitalData', () => {
        const track = sinon.spy(analytics, 'track');
        analytics.track(undefined, undefined);
        track.restore();
        sinon.assert.calledOnce(track);
    });

    it('call track without eventName', () => {
        const track = sinon.spy(analytics, 'track');
        analytics.track(undefined, navigationClickData);
        track.restore();
        sinon.assert.calledOnce(track);
    });

    it('call track function if Bootstrap scirpt not loaded', () => {
        analytics.hasInitialised = false;
        analytics.track('navigationClick', navigationClickData);
    });

    it('call _ensightenLoadedSuccess function if hasInitialised is false', () => {
        analytics.hasInitialised = false;
        analytics._ensightenLoadedSuccess();
    });

    it('call _ensightenLoadedSuccess function if hasInitialised is true', () => {
        analytics.hasInitialised = true;
        analytics._ensightenLoadedSuccess();
    });

    it('Check track getting called if Bootstrap scirpt loaded', () => {
        analytics.hasInitialised = true;
        window.Bootstrapper = {};
        analytics.track('navigationClick', navigationClickData);
        window.pageDataTracker = {};
        window.pageDataTracker.trackAnalyticsEvent = (eventName) => {
            console.log(`eventName triggered ${eventName}`);
        };
        analytics.track('navigationClick', navigationClickData);
        window.Bootstrapper = undefined;
        window.pageDataTracker = undefined;
        analytics.track('navigationClick', navigationClickData);
        window.pageDataTracker = {};
        window.pageDataTracker.trackAnalyticsEvent = undefined;
        analytics.track('navigationClick', navigationClickData);
    });

    it('Check submitPendingEvents getting called with eventQueue', () => {
        analytics.eventQueue = ['navigationClick'];
        analytics.submitPendingEvents('navigationClick', navigationClickData);
    });
    after(() => {
        navigationClickData = undefined;
    });
});
