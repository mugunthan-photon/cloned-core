import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { expect } from 'chai';
import RadioButton from './RadioButton';

describe(' Test Suite for <RadioButton /> ', () => {
    let wrapper;
    const isChecked = true;

    beforeEach(() => {
    /* Shallow Rendering component in before each to eliminate duplication */
        wrapper = mount(<RadioButton id="radio1" type="Default" value="test" isChecked={isChecked} />);
    });

    it('RadioButton component should exist ', () => {
        expect(wrapper).to.exist;
    });

    it('should be able to accept props', () => {
        expect(wrapper.props().id).to.equal('radio1');
        expect(wrapper.props().value).to.equal('test');
        expect(wrapper.props().type).to.equal('Default');
        expect(wrapper.props().isChecked).to.equal(true);
    });

    it('should be able to accept props', () => {
        wrapper = mount(<RadioButton id="radio1" type="Default" value="test" labelValue="test" checked/>);
        expect(wrapper.props().labelValue).to.equal('test');
    });

    it('Invoke handleClick and trigger onClick on click of RadioButton', () => {
        const onClickSpy = sinon.spy(wrapper.instance().onClick);
        wrapper.find('input').at(0).simulate('click');
        expect(onClickSpy).to.have.been.called;
    });

    it('Invoke handleChange and trigger onChange on click of RadioButton', () => {
        const onChangeSpy = sinon.spy(wrapper.instance().onChange);
        wrapper.find('input').at(0).simulate('change');
        expect(onChangeSpy).to.have.been.called;
    });
});

describe('data-tlprivate="true"', () => {
    let wrapper;

    beforeEach(() => {
        // Shallow Rendering component in before each to eliminate duplication
        wrapper = mount(<RadioButton id="radio1" type="Default" value="test" isChecked datatlPrivate />);
    });

    it('Input component should exist ', () => {
        expect(wrapper).to.exist;
    });
});
