import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Card from './Card';

describe(' Test Suite for <Card /> ', () => {
    let wrapper;


    beforeEach(() => {
        /* Shallow Rendering component in before each to eliminate duplication */
        wrapper = shallow(<Card>Product Name:</Card>);
    });

    it('Card component should exist ', () => {
        expect(wrapper).to.exist;
    });

    it('component should contain a div tag as a parent', () => {
        expect(wrapper.type()).to.equal('div');
    });

    it('should be able to render children', () => {
        expect(wrapper.props().children).to.equal('Product Name:');
    });
});
