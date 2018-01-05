import React, { Component, PropTypes } from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import Icon from './Icon';


// Dummy context provider for test.
class ContextProvider extends Component {
    static contextType = {
        router: PropTypes.func,
    };

    static ContextType = PropTypes.shape(ContextProvider.contextType);

    static childContextTypes = ContextProvider.contextType;

    static propTypes = {
        context: PropTypes.objectOf(ContextProvider.ContextType).isRequired,
        children: PropTypes.element.isRequired,
    };

    getChildContext() {
        return this.props.context;
    }

    render() {
        return this.props.children;
    }
}

const context = {
    router: {
        getCurrentLocation: () => ({
            pathname: '/basepath',
            search: '',
        }),
    },
};

describe('icon Component', () => {
    /**
     * Test cases for type SVG
     */
    describe('Icon type SVG', () => {
        let wrapper;

        beforeEach(() => {
            // Shallow Rendering component in before each to eliminate duplication
            wrapper = mount(<ContextProvider context={context}>
                <Icon iconType="svg" classNames="fa" width="16" height="16" viewBox="0 0 1024 1024" name="facebook"/>
            </ContextProvider>);
        });

        it('Icon component should exist ', () => {
            expect(wrapper).to.exist;
        });


        // Check whether SVG component is rendered
        it('Icon component should contain an SVG component', () => {
            expect(wrapper.find('svg')).to.have.length(1);
        });
    });


    /**
     * Test cases for type icon
     */
    describe('Icon type icon', () => {
        let wrapper;

        beforeEach(() => {
            const updatedContext = {
                router: {
                    getCurrentLocation: () => ({
                        pathname: '/basepath',
                        search: '',
                        basename: 'test',
                    }),
                },
            };
            // Shallow Rendering component in before each to eliminate duplication
            wrapper = mount(<ContextProvider context={updatedContext}>
                <Icon iconType="icon" classNames="fa" />
            </ContextProvider>);
        });

        it('Icon component should exist ', () => {
            expect(wrapper).to.exist;
        });

        // Checks wheter span component is rendered
        it('Icon component should contain an span component', () => {
            expect(wrapper.find('span')).to.have.length(1);
        });
    });

    /**
     * Test cases for type icon with out base name.
     */
    describe('Icon type icon with out base name', () => {
        let wrapper;

        beforeEach(() => {
            const updatedContext = {
                router: {
                    getCurrentLocation: () => ({
                        pathname: '',
                        search: '',
                        basename: '/',
                    }),
                },
            };
            // Shallow Rendering component in before each to eliminate duplication
            wrapper = mount(<ContextProvider context={updatedContext}>
                <Icon iconType="icon" classNames="fa" />
            </ContextProvider>);
        });

        it('Icon component should exist ', () => {
            expect(wrapper).to.exist;
        });

        // Checks wheter span component is rendered
        it('Icon component should contain an span component', () => {
            expect(wrapper.find('span')).to.have.length(1);
        });
    });

    /**
     * Test cases for type icon with out base name.
     */
    describe('Icon type icon with pathname as /', () => {
        let wrapper;

        beforeEach(() => {
            const updatedContext = {
                router: {
                    getCurrentLocation: () => ({
                        pathname: '/',
                        search: '',
                        basename: '/',
                    }),
                },
            };
            // Shallow Rendering component in before each to eliminate duplication
            wrapper = mount(<ContextProvider context={updatedContext}>
                <Icon iconType="icon" classNames="fa" />
            </ContextProvider>);
        });

        it('Icon component should exist ', () => {
            expect(wrapper).to.exist;
        });

        // Checks wheter span component is rendered
        it('Icon component should contain an span component', () => {
            expect(wrapper.find('span')).to.have.length(1);
        });
    });
});
