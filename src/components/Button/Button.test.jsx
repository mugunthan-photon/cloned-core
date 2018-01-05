import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import Button from './Button';

describe(' Test Suite for <Button /> ', () => {
    let wrapper;

    beforeEach(() => {
    /* Shallow Rendering component in before each to eliminate duplication */
        wrapper = mount(<Button buttonType="primary" size="lg" type="submit" ellipsis >primary Button</Button>);
    });

    it('Card component should exist ', () => {
        expect(wrapper).to.exist;
    });

    it.skip('component should contain a div tag as a parent', () => {
        expect(wrapper.type()).to.equal('button');
    });

    it('should be able to render children', () => {
        expect(wrapper.props().children).to.equal('primary Button');
        expect(wrapper.props().buttonType).to.equal('primary');
        expect(wrapper.props().size).to.equal('lg');
        expect(wrapper.props().type).to.equal('submit');
    });
});

describe(' Edge cases for <Button /> ', () => {
    let wrapper;

    beforeEach(() => {
    /* Shallow Rendering component in before each to eliminate duplication */
        wrapper = mount(<Button buttonType="primary" size={null} type="submit" >primary Button</Button>);
    });

    it('Card component should exist ', () => {
        expect(wrapper).to.exist;
    });
});
