import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { Accordion, AccordionSection } from './';
import styles from './__stories/storyBookTheme.css';

// Pass your Custom Theme in Here
const myTheme = {
    accordionContainerClass: styles.accordionContainer,
    accordionSectionClass: styles.accordionSection,
    accordionActiveClass: styles.selected,
    accordionTitleClass: styles.panelHeader,
    accordionPanelClass: styles.panel,
};

// `validation failed: invalid prop '${propName}' supplied to '${componentName}'.`

function expectErrorMsg(prop, component) {
    sinon.assert.calledWithMatch(console.error,
        new RegExp(`validation failed: invalid prop '${prop}' supplied to '${component}'.`));
}


describe('<Accordion />', () => {
    describe('Non Auto Collapsible implementation check', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(<Accordion selectedAccordionSectionIndex={1} isAutoCollapsible={false} toExpandAll>
                <AccordionSection title="Send Me the Latest Deals" index={0} titleRenderer={sinon.spy()} willToggle={false}>
                    <p>Section 1 Content</p>
                </AccordionSection>
                <AccordionSection title="Send Me the Latest Deals" index={1} titleRenderer={sinon.spy()}>
                    <p>Section 2 Content</p>
                </AccordionSection>
            </Accordion>);
        });

        it('Accordion and AccordionSection components exist', () => {
            expect(wrapper).to.exist;
        });

        it('should have two AccordionSection under parent wrapper Accordion', () => {
            expect(wrapper.find(AccordionSection)).to.have.length(2);
        });

        it('Should have props and initial state set', () => {
            expect(wrapper.props().isAutoCollapsible).to.equal(false);
            expect(wrapper.props().selectedAccordionSectionIndex).to.equal(1);
            expect(wrapper.props().onSelect).to.be.defined;
        });

        it('Onclicking Title panel should expand and callback should be called', () => {
            const handleClick = sinon.spy();
            const onAccordionSectionSelect = sinon.spy(wrapper.instance().onAccordionSectionSelect);

            wrapper.setState({ selectedAccordionSectionIndex: -1 });
            wrapper.setProps({ renderOnExpand: true });
            /**
             * Clicked accordion section should open
             */
            wrapper.find('h3').at(1).simulate('click', { index: 1 });
            expect(handleClick).to.have.been.called;
            expect(onAccordionSectionSelect).to.have.been.called;
            expect(wrapper.state().selectedAccordionSectionIndex).to.equal(1);

            /**
             * Clicking on the same pane should closeit with selectedAccordionSectionIndex set to -1
             */
            wrapper.find('h3').at(1).simulate('click', { index: 1 });
            wrapper.instance().onAccordionSectionSelect(-1);
            wrapper.setProps({ onSelect: () => {} });
            wrapper.instance().onAccordionSectionSelect(0);
            expect(handleClick).to.have.been.called;
            expect(onAccordionSectionSelect).to.have.been.called;
            expect(wrapper.state().selectedAccordionSectionIndex).to.equal(0);
        });
    });

    describe('Regular accordion behavior check with AutoCollapse behavior', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(<Accordion isAutoCollapsible>
                <AccordionSection title="Send Me the Latest Deals" index={0} titleRenderer={sinon.spy()}>
                    <p>Section 1 Content</p>
                </AccordionSection>
                <AccordionSection title="Send Me the Latest Deals" index={1} titleRenderer={sinon.spy()}>
                    <p>Section 1 Content</p>
                </AccordionSection>
            </Accordion>);
        });

        it('Accordion component without props', () => {
            expect(wrapper).to.exist;
            expect(wrapper.props().onSelect).to.be.defined;
        });

        it('Onclicking Title panel should expand and set state', () => {
            // const handleClick = sinon.spy();
            const onSelect = sinon.spy(wrapper.instance().onSelect);
            wrapper.find('h3').at(0).simulate('click', { index: 1 });
            expect(onSelect).to.have.been.called;
        });
    });

    describe('Themable capability of accordion', () => {
        let wrapper;

        beforeEach(() => {
            sinon.stub(console, 'error');
            wrapper = mount(<Accordion isAutoCollapsible toExpandAll themeConfig={myTheme}>
                <AccordionSection title="Send Me the Latest Deals" index={0} titleRenderer={sinon.spy()}>
                    <p>Section 1 Content</p>
                </AccordionSection>
                <AccordionSection title="Send Me the Latest Deals" index={1} titleRenderer={sinon.spy()}>
                    <p>Section 2 Content</p>
                </AccordionSection>
            </Accordion>);
        });
        afterEach(() => {
            console.error.restore();
        });
        it('Theme is passed as a prop', () => {
            expectErrorMsg('toExpandAll', 'Accordion');
            expect(wrapper.prop('theme')).to.be.defined;
        });
        it('ensures no errors', () => {
            // Make sure no errors were printed
            sinon.assert.notCalled(console.error);
        });
    });
    describe('<AccordionSection />', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(
                <AccordionSection title="Send Me the Latest Deals" index={0} titleRenderer={sinon.spy()} renderOnExpand>
                    <p>Section 1 Content</p>
                </AccordionSection>);
        });
        it('Checking for the default props of AccordionSection onSelect getting triggered', () => {
            wrapper.find('h3').at(0).simulate('click', { index: 1 });
        });
    });
});
