/* eslint-disable no-unused-expressions,import/no-extraneous-dependencies */
import React from 'react';
import { mount, shallow } from 'enzyme';
import { beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';
import { spy, stub } from 'sinon';
import Carousel from './Carousel';
import CarouselMockData from './__stories/mock';

const CarouselMockData2 = [...CarouselMockData];

describe('<Carousel />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Carousel carouselData={CarouselMockData}/>);
        wrapper.instance().slideNext = spy();
        wrapper.instance().slidePrevious = spy();
        wrapper.update();
    });

    afterEach(() => {
        wrapper.instance().slideNext.reset && wrapper.instance().slideNext.reset();
        wrapper.instance().slidePrevious.reset && wrapper.instance().slidePrevious.reset();
    });

    it('Carousel component should exist ', () => {
        expect(wrapper).to.exist;
        expect(wrapper.type()).to.equal('section');
    });

    it('Carousel component should contain a List component ', () => {
        expect(wrapper.find('List')).to.exist;
    });

    it('On clicking on the pagination bullet respective slide should be visible', () => {
        wrapper.setProps({
            displayPagination: true,
        });

        expect(wrapper.find('div[data-automation-id="pagination"]').length).to.equal(1);

        expect(wrapper.find('div[data-automation-id="pagination"]').find('button').length).to.equal(5);
    });

    it('On clicking Next button callback should be called and next slide should be visible', () => {
        wrapper.setState({ activeSlideIndex: 0 });
        wrapper.find('button').at(0).simulate('click');

        expect(wrapper.instance().slideNext.calledOnce).to.be.true;
    });

    it('If last slide is visible then clicking on next should take user to the first slide', () => {
        wrapper.setState({ activeSlideIndex: 5 });
        wrapper.find('button').at(0).find('button').simulate('click');

        expect(wrapper.instance().slideNext.calledOnce).to.be.true;
    });

    it('On clicking on previous it should move to previous slide', () => {
        wrapper.setState({ activeSlideIndex: 5 });
        wrapper.find('button').at(1).find('button').simulate('click');

        expect(wrapper.instance().slidePrevious.calledOnce).to.be.true;
    });

    it('On clicking on previous if first slide is visible then it should not move', () => {
        wrapper.setState({ activeSlideIndex: -1 });
        wrapper.find('button').at(1).find('button').simulate('click');

        expect(wrapper.instance().slidePrevious.calledOnce).to.be.true;
    });

    it('not display next button if continuous set to false', () => {
        wrapper = mount(
            <Carousel
                carouselData={CarouselMockData} automationId="test-automation-carousel"
                swipeOptions={{ continuous: false }}
            />,
        );

        wrapper.setState({ activeSlideIndex: 5 });
        expect(wrapper.find('[data-automation-id="carousel-prev"]').length).to.equal(1);
        expect(wrapper.find('[data-automation-id="carousel-next"]').length).to.equal(0);

        // fake slideNext call
        wrapper.instance().slideNext();

        wrapper.instance().slidePrevious();
    });

    it('rewinds carousel back in case data changed and flag is provided', () => {
        wrapper = mount(
            <Carousel
                carouselData={CarouselMockData} automationId="test-automation-carousel"
                rewindOnChange
            />,
        );

        const slideSpy = spy();
        wrapper.instance().slide = slideSpy;
        wrapper.setProps({ carouselData: CarouselMockData2 });

        expect(slideSpy.calledOnce).to.equal(true);
    });

    it('called slideCallback if providied', () => {
        const slideCallbackStub = stub();
        wrapper = mount(
            <Carousel
                carouselData={CarouselMockData} automationId="test-automation-carousel"
                slideCallback={slideCallbackStub}
            />,
        );

        wrapper.instance().slide(2);

        expect(slideCallbackStub.calledOnce).to.be.true;
    });
});
