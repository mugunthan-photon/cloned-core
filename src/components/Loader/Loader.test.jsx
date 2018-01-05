import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import Loader from './Loader';

describe('<Loader />', () => {
    let wrapper;

    beforeEach(() => {
        // Shallow Rendering component in before each to eliminate duplication
        wrapper = mount(<Loader />);
    });

    it('loader component should exist ', () => {
        expect(wrapper).to.exist;
    });
    it('loader component exists with overlay ', () => {
        const loaderWrapper = mount(<Loader keepOverlay="true" />);
        loaderWrapper.find('.loading-event-overlay').exists;
    });
});
