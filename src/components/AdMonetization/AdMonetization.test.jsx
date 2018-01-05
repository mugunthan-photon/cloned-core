/* eslint-disable */
import React from 'react';
import { beforeEach, describe, it } from 'mocha';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { AdsContainer, ADSenseSearch, DFPMonetization } from './AdMonetization';

const adBlockConfig = {
    width: '700px',
    number: 3,
};

describe('ADMonetizations test', () => {

    describe('DFP Monetization starts in here', () => {
        let dfpComponent;
        beforeEach(() => {
            // Mocking the googletag
            global.googletag = {
                cmd: {
                    push: function() {
                    }
                },
                display: function() {
                },
                pubads: function() {
                },
                defineSlot: function() {
                },
            };
            dfpComponent = mount(
                <DFPMonetization
                    id="div-gpt-ad-jcpenney_homepage-3"
                    width={728}
                    height={90}
                    adslot="/5705/bv.jcpenney/homepage"
                    pos="bottom"
                />
            );
        });

        it('DFP Monetization component is rendered properly', () => {
            expect(dfpComponent).to.have.length(1);
        });

        it('Trying to update component and testing for should component update', () => {
            dfpComponent.update();
        });
    });

    describe('DFP Monetization negative scenarios', () => {
        let dfpComponent;
        beforeEach(() => {
            // Mocking the googletag
            global.googletag = {
                cmd: null,
                display: function() {
                },
                pubads: function() {
                },
                defineSlot: function() {
                },
            };
            dfpComponent = mount(
                <DFPMonetization
                    id="div-gpt-ad-jcpenney_homepage-3"
                    width={728}
                    height={90}
                    adslot="/5705/bv.jcpenney/homepage"
                    pos="bottom"
                />
            );
        });

        it('DFP Monetization component is rendered properly', () => {
            expect(dfpComponent).to.have.length(1);
        });

        it('Trying to update component and testing for should component update', () => {
            dfpComponent.update();
        });
    });

    describe('Adsense', () => {
        let adSenseComponent;

        beforeEach(() => {
            global._googCsa = function(g, o) {
                return true;
            };
            adSenseComponent = mount(
                <ADSenseSearch
                    id="adContainer"
                    query="Levis"
                    themeConfig={adBlockConfig}
                    isAdTest
                />
            );
        });

        it('Adsense Test cases', () => {
            expect(adSenseComponent).to.have.length(1);

            let _googCsa = sinon.spy(_googCsa);
            expect(_googCsa).to.be.called;
        });

        it('Trying to update component and testing for should component update', () => {
            adSenseComponent.update();
        });
    });


    describe('Ads container stateless component test', () => {
        it('component appears in', () => {
            global._googCsa = function(g, o) {
                return true;
            };
            const adsContainer = shallow(
                <AdsContainer id="uniqueID"/>
            );

            expect(adsContainer).to.have.length(1);
        });
    });


});
