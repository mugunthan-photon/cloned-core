import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { Tabs, TabPanel } from './Tabs';
import Title from './Title';
import Content from './Content';


/**
 * Test cases for Tab Component
 */
describe('<Tabs>', () => {
    describe('Tabs Component', () => {
        let wrapper;

        beforeEach(() => {
            // Full DOM  Rendering component in before each to eliminate duplication
            wrapper = mount(<Tabs activeTabPanelIndex={0} onTabChange={sinon.spy()}>
                <TabPanel title="First Tab" index={0}>
                    <Title>First Tab</Title>
                    <Content><p>London is the capital of England.</p></Content>
                </TabPanel>
                <TabPanel title="Second Tab" index={1}>
                    <Title>Second Tab</Title>
                    <Content><p>Paris is the capital of France.</p></Content>
                </TabPanel>
            </Tabs>);
        });

        it('Tabs component should exist ', () => {
            expect(wrapper).to.exist;
        });

        it('should have two TabPanel under parent wrapper Tabs', () => {
            expect(wrapper.find(TabPanel)).to.have.length(2);
        });


        it('Should have props and initial state set', () => {
            expect(wrapper.props().activeTabPanelIndex).to.equal(0);
            expect(wrapper.props().onSelect).to.be.defined;
        });

        it('Onclicking Title panel should expand and callback should be called', () => {
            // const onSelect = sinon.spy(wrapper.instance().onSelect);
            const onTabSelect = sinon.spy(wrapper.instance(), 'onTabSelect');
            /**
             * Clicked TabPanel should open
             */
            console.log(wrapper.props());
            // Initial state
            expect(wrapper.props().activeTabPanelIndex).to.equal(0);
            wrapper.update();
            wrapper.find('li').at(1).find('button').simulate('click', { index: 1 });
            wrapper.setProps({ activeTabPanelIndex: 0 });
            wrapper.find('li').at(1).find('button').simulate('click', { index: 1 });
            expect(onTabSelect.calledTwice).to.equal(true);
            expect(wrapper.props().activeTabPanelIndex).to.equal(0);

            // checking for the else case
            wrapper.find('li').at(1).find('button').simulate('click', { index: 1 });
            expect(wrapper.props().onTabChange.calledOnce).to.equal(false);
        });

        it('Onclicking Title panel should expand and callback should be called', () => {
            const onTabSelect = sinon.spy(wrapper.instance(), 'onTabSelect');
            wrapper.setProps({ activeTabPanelIndex: null });
            wrapper.instance().onTabSelect(1);
            expect(onTabSelect.calledOnce).to.equal(true);
            expect(wrapper.props().onTabChange.calledOnce).to.equal(true);
        });

        it('Onclicking Title panel should expand and callback should be called', () => {
            wrapper = mount(<Tabs activeTabPanelIndex={0} closeOnDBClick={sinon.spy()}>
                <TabPanel title="First Tab" index={0}>
                    <Title>First Tab</Title>
                    <Content><p>London is the capital of England.</p></Content>
                </TabPanel>
            </Tabs>);
            wrapper.setState({ activeTabPanelIndex: 1 });
            wrapper.instance().onTabSelect(1);
            expect(wrapper).to.exist;
        });
    });


    describe('Tabs Panel Component', () => {
        let wrapper;

        beforeEach(() => {
            // Full DOM  Rendering component in before each to eliminate duplication
            wrapper = shallow(
                <TabPanel title="First Tab" index={0}>
                    <Title>First Tab</Title>
                    <Content><p>London is the capital of England.</p></Content>
                </TabPanel>);
        });
        it('Testing Tab Panel Component', () => {
            expect(wrapper).to.exist;
        });
        it('Tab Panel click', () => {
            wrapper.find('li').at(0).find('button').simulate('click', { index: 0 });
        });
    });


    describe('<Title /> Cases', () => {
        it('Testing for the Title Component renders correctly', () => {
            const titleComponent = shallow(<Title>This is a Title Test</Title>);
            titleComponent.find('div').first().props('children');
        });
    });


    describe('<Content /> Test Cases', () => {
        it('Testing for the Content Component renders correctly', () => {
            const contentComponent = shallow(<Content>This is a Title Test</Content>);
            contentComponent.find('div').first().props('children');
        });
    });
});
