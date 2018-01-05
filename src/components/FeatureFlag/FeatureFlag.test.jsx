import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import ContextProvider from './ContextProvider';
import FeatureFlag from './FeatureFlag';

const component = (
    <FeatureFlag name="feature">
        <a href="/some/link">Test</a>
    </FeatureFlag>
);

describe('<FeatureFlag />', () => {
    it('display feature when feature is turned on', () => {
        const wrapper = mount(<ContextProvider context={{ featureFlags: { feature: true } }}>
            {component}
        </ContextProvider>);

        expect(wrapper.find('a').length).to.equal(1);
    });

    it('hides feature when feature is turned off', () => {
        const wrapper = mount(<ContextProvider context={{ featureFlags: { feature: false } }}>
            {component}
        </ContextProvider>);

        expect(wrapper.find('a').length).to.equal(0);
    });

    it('diplay when feature is turned off and negate is on', () => {
        const negatedComponent = (
            <FeatureFlag name="!feature">
                <a href="/some/link">Test</a>
            </FeatureFlag>
        );

        const wrapper = mount(<ContextProvider context={{ featureFlags: { feature: false } }}>
            {negatedComponent}
        </ContextProvider>);

        expect(wrapper.find('a').length).to.equal(1);
    });

    it('works when nested feature name is provided', () => {
        const deepComponent = (
            <FeatureFlag name="feature.nested">
                <a href="/some/link">Test</a>
            </FeatureFlag>
        );

        const wrapper = mount(<ContextProvider context={{ featureFlags: { feature: { nested: true } } }}>
            {deepComponent}
        </ContextProvider>);

        expect(wrapper.find('a').length).to.equal(1);
    });

    it('works when key is not provided', () => {
        const wrapper = mount(<ContextProvider context={{ featureFlags: {} }}>
            {component}
        </ContextProvider>);

        expect(wrapper.find('a').length).to.equal(0);
    });
});
