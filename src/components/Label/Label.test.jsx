import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Label from './Label';

describe(' Test Suite for <Label /> ', () => {
    let wrapper;

    beforeEach(() => {
        // Shallow Rendering component in before each to eliminate duplication
        wrapper = shallow(<Label className="default">First Name:</Label>);
    });

    it('Label component should exist ', () => {
        expect(wrapper).to.exist;
    });

    it('component should contain a span tag as a parent', () => {
        expect(wrapper.type()).to.equal('span');
    });

    it('should be able to pass props', () => {
        expect(wrapper.props().className).to.equal('label label-default');
        expect(wrapper.props().children).to.equal('First Name:');
    });
});
