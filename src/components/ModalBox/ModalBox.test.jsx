import sinon from 'sinon';
import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import ScrollLockModalBox, { ModalBox } from './ModalBox';


describe('Test Suite for <Modal /> ', () => {
    let wrapper;
    let wrapperWithHeader;
    let wrapperwithmodalClosed;
    const modalOpen = true;
    const modalClose = false;
    const onCloseSpy = sinon.spy();

    const closeModelSpy = sinon.spy(ModalBox.prototype, 'closeModal');

    beforeEach(() => {
        // Shallow Rendering component in before each to eliminate duplication
        wrapper = mount(<ModalBox showModal={modalOpen} onClose={onCloseSpy}>
            <div>
              Content is displayed in dialog
            </div>
        </ModalBox>);

        wrapperWithHeader = mount(<ModalBox showModal={modalOpen} onClose={onCloseSpy} defaultHeader>
            <div>
               Content is displayed in dialog
            </div>
        </ModalBox>);
        wrapperwithmodalClosed = mount(<ModalBox showModal={modalClose} defaultHeader>
            <div>
               Content is displayed in dialog
            </div>
        </ModalBox>);
    });

    it('ModalBox component should exist ', () => {
        expect(wrapper).to.exist;
    });

    it.skip('ModalBox component should contain a div tag as a parent', () => {
        expect(wrapper.type()).to.equal('div');
    });

    it.skip('ModalBox component should not contain a div tag as a parent', () => {
        expect(wrapperwithmodalClosed.type()).to.not.equal('div');
    });

    it('Invoke closeModel and trigger onClose on click of close button', () => {
        wrapperWithHeader.find('button').simulate('click');
        expect(onCloseSpy.calledOnce).to.equal(true);
        expect(closeModelSpy.calledOnce).to.equal(true);
    });
});

describe('Custom <Modal /> ', () => {
    let wrapper;
    const modalOpen = true;
    const onCloseSpy = sinon.spy();

    beforeEach(() => {
        // Shallow Rendering component in before each to eliminate duplication
        wrapper = mount(<ModalBox defaultCloseBtn={false} showModal={modalOpen} onClose={onCloseSpy}>
            <div>
              Content is displayed in dialog
            </div>
        </ModalBox>);
    });

    it('ModalBox component should exist ', () => {
        expect(wrapper).to.exist;
    });

    it.skip('ModalBox component should contain a div tag as a parent', () => {
        expect(wrapper.type()).to.equal('div');
    });
});

describe('Scroll Lock Modal', () => {
    let wrapper;
    let wrapperInstance;

    beforeEach(() => {
        // Shallow Rendering component in before each to eliminate duplication
        wrapper = mount(<ScrollLockModalBox showModal={false} onClose={sinon.stub()}>
            <div>
              Content is displayed in dialog
            </div>
        </ScrollLockModalBox>);

        wrapperInstance = wrapper.instance();
        sinon.spy(wrapperInstance, 'lockScroll');
        sinon.spy(wrapperInstance, 'releaseScroll');
    });

    afterEach(() => {
        wrapperInstance.lockScroll.reset();
        wrapperInstance.releaseScroll.reset();
        wrapper.unmount();
    });

    it('should update call scrollLock', () => {
        wrapper.setProps({
            showModal: true,
        });

        expect(wrapperInstance.lockScroll.calledOnce).to.be.true;

        wrapper.setProps({
            showModal: false,
        });

        expect(wrapperInstance.releaseScroll.calledOnce).to.be.true;
    });
});
