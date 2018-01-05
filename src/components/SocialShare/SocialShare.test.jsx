import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import SocialShare from './SocialShare';


/**
 * Test cases for type SVG
 */
describe('<SocialShare>', () => {
    let wrapper;

    beforeEach(() => {
        // Shallow Rendering component in before each to eliminate duplication
        wrapper = shallow(<SocialShare iconClass="class1 class2" socialShareIcons={['FACEBOOK', 'TWITTER', 'GOOGLEPLUS']} />);
    });

    it('Social Share component should exist ', () => {
        expect(wrapper).to.exist;
    });


    // Check whether DIV component is rendered
    it('Social Share component should contain an SVG component', () => {
        expect(wrapper.find('div')).to.have.length(1);
    });
});
