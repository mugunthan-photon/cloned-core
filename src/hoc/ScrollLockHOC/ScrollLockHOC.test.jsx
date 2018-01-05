import sinon from 'sinon';
import React, { Component, PropTypes } from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import ScrollLockHOCFactory from './ScrollLockHOC';

class DummyComponent extends Component {
    propTypes = {
        scrollLock: PropTypes.bool,
    };

    defaultProps = {
        scrollLock: false,
    };

    render() {
        return (
            <div>
                Some Content
            </div>
        );
    }
}

const ScrollLockHOCDummyComponent = ScrollLockHOCFactory()(DummyComponent);

describe('<ScrollLockHOC> with false scrollLock on didMount', () => {
    let wrapper;
    let wrapperInstance;

    beforeEach(() => {
        wrapper = mount(<ScrollLockHOCDummyComponent scrollLock={false} >
            <div>
              Content is displayed in dialog
            </div>
        </ScrollLockHOCDummyComponent>);

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
            scrollLock: true,
        });

        expect(wrapperInstance.lockScroll.calledOnce).to.be.true;

        wrapper.setProps({
            scrollLock: false,
        });

        expect(wrapperInstance.releaseScroll.calledOnce).to.be.true;
    });
});

describe('<ScrollLockHOC> with true scrollLock on didMount', () => {
    let wrapper;
    let wrapperInstance;

    beforeEach(() => {
        wrapper = mount(<ScrollLockHOCDummyComponent scrollLock>
            <div>
              Content is displayed in dialog
            </div>
        </ScrollLockHOCDummyComponent>);

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
            scrollLock: true,
        });

        expect(wrapperInstance.lockScroll.notCalled).to.be.true;

        wrapper.setProps({
            scrollLock: false,
        });

        expect(wrapperInstance.releaseScroll.calledOnce).to.be.true;
    });
});
