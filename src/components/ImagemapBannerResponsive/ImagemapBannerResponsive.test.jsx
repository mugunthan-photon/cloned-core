import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { browserHistory } from 'react-router';
import imagemapAreaMockData from './__stories/mock';
import ImagemapBannerResponsive from './ImagemapBannerResponsive';

describe('<ImagemapBannerResponsive />', () => {
    let wrapperMount;
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(
            <ImagemapBannerResponsive
                automationId="test-automation-banner-responsive"
                imageUrl="http://m.jcpenney.com/mobile//images/pg00001_m550007_70300034.jpg"
                imagemapArea={imagemapAreaMockData}
                imageAltText="blush"
                analyticsTag="testTag"
            />,
        );

        wrapperMount = mount(
            <ImagemapBannerResponsive
                automationId="test-automation-banner-responsive"
                imageUrl="http://m.jcpenney.com/mobile//images/pg00001_m550007_70300034.jpg"
                imagemapArea={imagemapAreaMockData}
                imageAltText="blush"
                analyticsTag="testTag"
            />,
        );
    });

    it('ImagemapBannerResponsive component should exist ', () => {
        expect(wrapper).to.exist;
    });

    it('goToPage soft route ', () => {
        const softRoute = true;
        let instance = null;
        const e = {
            target: {
                dataset: {
                    softlink: '/g?test=TestTag',
                    leaf: false,
                    analyticstag: 'TestTag',
                },
            },
            preventDefault: () => {},
        };

        const history = sinon.stub(browserHistory, 'push', () => true);
        wrapper = shallow(
            <ImagemapBannerResponsive
                automationId="test-automation-banner-responsive"
                imageUrl="http://m.jcpenney.com/mobile//images/pg00001_m550007_70300034.jpg"
                imagemapArea={imagemapAreaMockData}
                imageAltText="blush"
                softRoute={softRoute}
                analyticsTag="testTag"
            />,
        );
        instance = wrapper.instance();
        instance.goToPage(e);
        expect(history).to.have.been.called;
    });

    it('goToPage hard route ', () => {
        const softRoute = false;
        let instance = null;
        const e = {
            target: {
                dataset: {
                    softlink: 'http://m.jcpenney.com/g/jewelry-and-watches/N-bwo44?pageType=X2H2',
                },
            },
            preventDefault: () => {},
        };

        wrapper = shallow(
            <ImagemapBannerResponsive
                automationId="test-automation-banner-responsive"
                imageUrl="http://m.jcpenney.com/mobile//images/pg00001_m550007_70300034.jpg"
                imagemapArea={imagemapAreaMockData}
                imageAltText="blush"
                softRoute={softRoute}
                analyticsTag="testTag"
            />,
        );
        instance = wrapper.instance();
        instance.goToPage(e);
        expect(e.target.dataset.softlink).to.be.string;
    });


    it('On loading of the image onLoad handleImageLoaded function should be called', () => {
        const handleImageLoaded = sinon.spy();
        wrapperMount.find('.imagemapBannerResponsive').find('img').simulate('load');
        expect(handleImageLoaded).to.have.been.called;
    });

    it('loading component', () => {
        expect(wrapperMount).to.exist;
        expect(wrapperMount.find('img')).to.have.length(1);
        expect(wrapperMount.find('map')).to.have.length(1);
        expect(wrapperMount.find('area')).to.have.length(2);
        wrapperMount.find('img').props().onLoad();
        wrapperMount.find('img').props().onError();
        wrapperMount.unmount();
    });
});
