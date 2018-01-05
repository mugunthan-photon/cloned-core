import React, { Component } from 'react';
import noScroll from 'no-scroll';


/**
 * Higher order component to add scroll lock to body.
 * @param {String} scrollLockProperty   Property of Wrapped component which will enable scrollLock.
 */
const ScrollLockHOCFactory = (scrollLockProperty) => { // eslint-disable-line
    /**
     * @param {Object} WrappedComponent     React Component
     */

    scrollLockProperty = scrollLockProperty || 'scrollLock';

    return function Factory(WrappedComponent) {
        return class ScrollLockHOC extends Component { // eslint-disable-line
            constructor() {
                super();
                this.lockScroll = this.lockScroll.bind(this);
                this.releaseScroll = this.releaseScroll.bind(this);
            }

            componentDidMount() {
                if (this.props[scrollLockProperty]) {
                    this.lockScroll();
                }
            }

            componentDidUpdate(prevProps) {
                if (prevProps[scrollLockProperty] !== this.props[scrollLockProperty]) {
                    if (this.props[scrollLockProperty]) {
                        this.lockScroll();
                    } else {
                        this.releaseScroll();
                    }
                }
            }

            componentWillUnmount() {
                this.releaseScroll();
            }

            lockScroll() {
                noScroll.on();
            }

            releaseScroll() {
                noScroll.off();
            }

            render() {
                const props = Object.assign({}, this.props);
                return (
                    <WrappedComponent {...props}/>
                );
            }
        };
    };
};

export default ScrollLockHOCFactory;
