import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { expect } from 'chai';
import MessageBox from './MessageBox';

describe(' Test Suite for <MessageBox /> ', () => {
    let wrapper;
    let wrapper2;
    let wrapper3;
    let wrapper4;
    let wrapper5;
    let wrapper6;
    const showMessage1 = true;
    const showMessage2 = false;
    const children1 = null;
    const children2 = (<div>Child Element</div>);
    const onCloseSpy = sinon.spy();

    const closeBoxSpy = sinon.spy(MessageBox.prototype, 'closeBox');

    beforeEach(() => {
    /* Shallow Rendering component in before each to eliminate duplication */
        wrapper = mount(<MessageBox type="error" level="page" showMessage={showMessage1} title="This is an Error Message" onClose={onCloseSpy}>{children1}</MessageBox>);
        wrapper2 = mount(<MessageBox type="error" level="page" showMessage={showMessage2} title="This is an Error Message" onClose={onCloseSpy} >{children1}</MessageBox>);
        wrapper3 = mount(<MessageBox type="error" level="page" showMessage={showMessage1} title="" onClose={onCloseSpy} >{children1}</MessageBox>);
        wrapper4 = mount(<MessageBox type="error" level="page" showMessage={showMessage1} title="This is an Error Message" onClose={onCloseSpy}>{children2}</MessageBox>);
        wrapper5 = mount(<MessageBox type="error" level="page" showMessage={showMessage1} title="This is an Error Message" hasClose={false}>{children2}</MessageBox>);
        wrapper6 = mount(<MessageBox type="error" level="inline" showMessage={showMessage1}showTitle title="This is an Error Message" hasClose={false}>{children2}</MessageBox>);
    });

    it('MessageBox component should exist ', () => {
        expect(wrapper).to.exist;
    });

    it('should be able to accept props', () => {
        expect(wrapper.props().type).to.equal('error');
        expect(wrapper.props().level).to.equal('page');
        expect(wrapper.props().showMessage).to.equal(true);
        expect(wrapper.props().title).to.equal('This is an Error Message');
        expect(wrapper.props().children).to.equal(children1);
    });

    it('should be able to accept showMessage props false', () => {
        expect(wrapper2.props().type).to.equal('error');
        expect(wrapper2.props().level).to.equal('page');
        expect(wrapper2.props().showMessage).to.equal(false);
        expect(wrapper2.props().title).to.equal('This is an Error Message');
        expect(wrapper2.props().children).to.equal(children1);
    });

    it('should be able to accept title props empty', () => {
        expect(wrapper3.props().type).to.equal('error');
        expect(wrapper3.props().level).to.equal('page');
        expect(wrapper3.props().showMessage).to.equal(true);
        expect(wrapper3.props().title).to.equal('');
        expect(wrapper3.props().children).to.equal(children1);
    });

    it('should be able to accept children props', () => {
        expect(wrapper4.props().type).to.equal('error');
        expect(wrapper4.props().level).to.equal('page');
        expect(wrapper4.props().showMessage).to.equal(true);
        expect(wrapper4.props().title).to.equal('This is an Error Message');
        expect(wrapper4.props().children).to.equal(children2);
    });

    it('Invoke closeBox and trigger onClose on click of close button', () => {
        wrapper.find('button').simulate('click');
        expect(onCloseSpy.calledOnce).to.equal(true);
        expect(closeBoxSpy.calledOnce).to.equal(true);
    });

    it('close option conditional display', () => {
        expect(wrapper5).to.exist;
        expect(wrapper5.props().hasClose).to.equal(false);
    });

    it('close option conditional display', () => {
        expect(wrapper6).to.exist;
        expect(wrapper6.props().showTitle).to.equal(true);
    });
});
