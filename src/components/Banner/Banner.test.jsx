import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Banner from './Banner';


describe('<Banner />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Banner href="/?test=test1" analyticsTag="testTag" goToUrl="http://m.jcpenney.com/jsp/rewards/rewardsHome.jsp" bannerImageUrl="http://m.jcpenney.com/mobile/images/pg00001_m550007_47100016.gif" altText="Banner Rewards" target="_blank" />);
    });

    it('Banner component should exist ', () => {
        expect(wrapper).to.exist;
    });

    it('Banner linkcreaction ', () => {
        const instance = wrapper.instance();
        wrapper.setProps({ softRoute: true });
        expect(instance.linkCreation()).to.be.an('object');
    });


    it('Banner parent should be a div ', () => {
        expect(wrapper.type()).to.equal('div');
    });

    it('target should be blank and altText to be defined', () => {
        expect(wrapper.instance().props.target).to.equal('_blank');
        expect(wrapper.instance().props.altText).to.match(/[A-za-z0-9 ]/);
    });
});

describe('<Banner without link />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Banner goToUrl="http://m.jcpenney.com/jsp/rewards/rewardsHome.jsp" bannerImageUrl="http://m.jcpenney.com/mobile/images/pg00001_m550007_47100016.gif" altText="Banner Rewards" target="_blank" />);
    });

    it('Banner component should exist ', () => {
        wrapper.find('Image').props().onImageLoad();
        wrapper.find('Image').props().onImageError();
        expect(wrapper).to.exist;
    });
});
