import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { expect } from 'chai';
import CheckBox from './CheckBox';

describe(' Test Suite for <CheckBox /> ', () => {
    let wrapper;
    let wrapper1;

    beforeEach(() => {
        /* Shallow Rendering component in before each to eliminate duplication */
        const config = {
            id: 'id',
            value: 'value',
            name: 'name',
            checked: true,
            disabled: false,
        };
        wrapper = mount(<CheckBox label={'test'} config={config} />);
        wrapper1 = mount(<CheckBox label={'test'} config={config} disabled />);
    });

    it('Checkbox component should exist ', () => {
        expect(wrapper).to.exist;
    });

    it('should be able to accept props', () => {
        expect(wrapper.props().label).to.equal('test');
        expect(wrapper.props().config.checked).to.equal(true);
    });

    it('Invoke click event', () => {
        const onClickSpy = sinon.spy(wrapper.instance().onClick);
        wrapper.find('input').at(0).simulate('click');
        expect(onClickSpy).to.have.been.called;
    });

    it('Invoke click event', () => {
        const onChangeSpy = sinon.spy(wrapper.instance().onChange);
        wrapper.find('input').at(0).simulate('change');
        expect(onChangeSpy).to.have.been.called;
    });

    it('Check with checked props case', () => {
        expect(wrapper.props().config.checked).to.equal(true);
    });

    it('Check with checked props case', () => {
        expect(wrapper1.props().disabled).to.equal(true);
    });
});

// handled the case by passing hasError props to false
describe(' Test Suite for <CheckBox /> ', () => {
    let wrapper;

    beforeEach(() => {
        /* Shallow Rendering component in before each to eliminate duplication */
        const config = {
            id: 'id',
            value: 'value',
            name: 'name',
            checked: false,
            disabled: true,
        };
        wrapper = mount(<CheckBox label={'test'} config={config} enableFastClick />);
    });

    it('Check with checked props case', () => {
        expect(wrapper.props().config.checked).to.equal(false);
    });
});
