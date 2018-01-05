import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import LoadSVG from './LoadSVG';
import sample from '../../assets/svg/cross.svg';

describe(' Test Suite for <LoadSVG /> ', () => {
    let wrapper;

    beforeEach(() => {
    /* Shallow Rendering component in before each to eliminate duplication */
        wrapper = mount(<LoadSVG svgPaths={[sample]} />);
    });

    it('LoadSVG component should exist ', () => {
        expect(wrapper).to.exist;
    });

    it.skip('component should contain a div tag as a parent', () => {
        expect(wrapper.type()).to.equal('LoadSVG');
    });
});
