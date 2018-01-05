import React from 'react';
import { Accordion, AccordionSection } from '../index';
import Image from '../../Image/Image';
import * as styles from './storyBookTheme.css';

// Pass your Custom Theme in Here
const myTheme = {
    accordionContainerClass: styles.accordionContainer,
    accordionSectionClass: styles.accordionSection,
    accordionActiveClass: styles.selected,
    accordionTitleClass: styles.panelHeader,
    accordionPanelClass: styles.panel,
    accordionIconClass: styles.iconBlock,
};
const title = (<div>this is asaple</div>);
const stories = [
    {
        name: 'Accordion',
        story: () => (
            <div>
                <p>Recommended: Accordion sections will render the children only when user expands</p>
                <Accordion themeConfig={myTheme} isAutoCollapsible automationId={'test-automation-tab-list-2'} >
                    <AccordionSection title="Send Me the Latest Deals" index={0} renderOnExpand>
                        <p>Lorem ipsum dolor sit amet, pro ex sanctus propriae, vel fugit latine accusata ex. Ferri
                            erroribus quiut, id eum vitae gubergren consectetuer, per adipiscing vituperata quaerendum
                            cu. Liber audire eu has, utroque veritus ad nec, reque admodum mel eu. Ea dico debitis
                            docendi ius. Eimea mucius persius, et usu aeque simul graeco, purto accusata usu ad.</p>
                    </AccordionSection>

                    <AccordionSection title="More Ways To Shop" index={1} renderOnExpand>
                        <p>Lorem ipsum dolor sit amet, pro ex sanctus propriae, vel fugit latine accusata ex. Ferri
                            erroribus quiut, id eum vitae gubergren consectetuer, per adipiscing vituperata quaerendum
                            cu. Liber audire eu has, utroque veritus ad nec, reque admodum mel eu. Ea dico debitis
                            docendi ius. Eimea mucius persius, et usu aeque simul graeco, purto accusata usu ad.</p>
                    </AccordionSection>

                    <AccordionSection title="JCPenney Rewards & Credit" index={2} renderOnExpand>
                        <p>Lorem ipsum dolor sit amet, pro ex sanctus propriae, vel fugit latine accusata ex. Ferri
                            erroribus quiut, id eum vitae gubergren consectetuer, per adipiscing vituperata quaerendum
                            cu. Liber audire eu has, utroque veritus ad nec, reque admodum mel eu. Ea dico debitis
                            docendi ius. Eimea mucius persius, et usu aeque simul graeco, purto accusata usu ad.</p>
                        <div className={styles.imageBlock}>
                            <Image
                                src="http://s7d9.scene7.com/is/image/JCPenney//DP1003201417030645M?$department_main$"
                                alt="Sample alt text"
                            />
                        </div>
                    </AccordionSection>
                </Accordion>
                <Accordion selectedAccordionSectionIndex={1} isAutoCollapsible={false} toExpandAll automationId={'test-automation-tab-list-0'}>
                    <AccordionSection title="Send Me the Latest Deals" index={0} iconTheme={styles.iconTheme}>
                        <p>Lorem ipsum dolor sit amet, pro ex sanctus propriae, vel fugit latine accusata ex. Ferri
                            erroribus quiut, id eum vitae gubergren consectetuer, per adipiscing vituperata quaerendum
                            cu. Liber audire eu has, utroque veritus ad nec, reque admodum mel eu. Ea dico debitis
                            docendi ius. Eimea mucius persius, et usu aeque simul graeco, purto accusata usu ad.</p>
                    </AccordionSection>

                    <AccordionSection title={title} index={1}>
                        <p>Lorem ipsum dolor sit amet, pro ex sanctus propriae, vel fugit latine accusata ex. Ferri
                            erroribus quiut, id eum vitae gubergren consectetuer, per adipiscing vituperata quaerendum
                            cu. Liber audire eu has, utroque veritus ad nec, reque admodum mel eu. Ea dico debitis
                            docendi ius. Eimea mucius persius, et usu aeque simul graeco, purto accusata usu ad.</p>
                    </AccordionSection>

                    <AccordionSection title="JCPenney Rewards & Credit" index={2}>
                        <p>Lorem ipsum dolor sit amet, pro ex sanctus propriae, vel fugit latine accusata ex. Ferri
                            erroribus quiut, id eum vitae gubergren consectetuer, per adipiscing vituperata quaerendum
                            cu. Liber audire eu has, utroque veritus ad nec, reque admodum mel eu. Ea dico debitis
                            docendi ius. Eimea mucius persius, et usu aeque simul graeco, purto accusata usu ad.</p>
                    </AccordionSection>
                </Accordion>

                <br />
                <p> Default Accordion Behavior autoclose other panes and open the clicked pane</p>
                <hr />

                <Accordion selectedAccordionSectionIndex={0} isAutoCollapsible automationId={'test-automation-tab-list-1'}>
                    <AccordionSection title="Send Me the Latest Deals" index={0}>
                        <div className={styles.imageBlock}>
                            <Image
                                src="http://s7d9.scene7.com/is/image/JCPenney//DP1003201417030645M?$department_main$"
                                alt="Sample alt text"
                            />
                        </div>
                        <p>Lorem ipsum dolor sit amet, pro ex sanctus propriae, vel fugit latine accusata ex. Ferri
                            erroribus quiut, id eum vitae gubergren consectetuer, per adipiscing vituperata quaerendum
                            cu. Liber audire eu has, utroque veritus ad nec, reque admodum mel eu. Ea dico debitis
                            docendi ius. Eimea mucius persius, et usu aeque simul graeco, purto accusata usu ad.</p>
                    </AccordionSection>

                    <AccordionSection title="More Ways To Shop" index={1}>
                        <p>Lorem ipsum dolor sit amet, pro ex sanctus propriae, vel fugit latine accusata ex. Ferri
                            erroribus quiut, id eum vitae gubergren consectetuer, per adipiscing vituperata quaerendum
                            cu. Liber audire eu has, utroque veritus ad nec, reque admodum mel eu. Ea dico debitis
                            docendi ius. Eimea mucius persius, et usu aeque simul graeco, purto accusata usu ad.</p>
                    </AccordionSection>

                    <AccordionSection title="JCPenney Rewards & Credit" index={2}>
                        <p>Lorem ipsum dolor sit amet, pro ex sanctus propriae, vel fugit latine accusata ex. Ferri
                            erroribus quiut, id eum vitae gubergren consectetuer, per adipiscing vituperata quaerendum
                            cu. Liber audire eu has, utroque veritus ad nec, reque admodum mel eu. Ea dico debitis
                            docendi ius. Eimea mucius persius, et usu aeque simul graeco, purto accusata usu ad.</p>
                    </AccordionSection>
                </Accordion>

                <br />
                <p> Accordion with custom theme - Themable you can pass the theme object for custom theme</p>
                <hr />

                <Accordion themeConfig={myTheme} isAutoCollapsible automationId={'test-automation-tab-list-2'}>
                    <AccordionSection title="Send Me the Latest Deals" index={0}>
                        <p>Lorem ipsum dolor sit amet, pro ex sanctus propriae, vel fugit latine accusata ex. Ferri
                            erroribus quiut, id eum vitae gubergren consectetuer, per adipiscing vituperata quaerendum
                            cu. Liber audire eu has, utroque veritus ad nec, reque admodum mel eu. Ea dico debitis
                            docendi ius. Eimea mucius persius, et usu aeque simul graeco, purto accusata usu ad.</p>
                    </AccordionSection>

                    <AccordionSection title="More Ways To Shop" index={1}>
                        <p>Lorem ipsum dolor sit amet, pro ex sanctus propriae, vel fugit latine accusata ex. Ferri
                            erroribus quiut, id eum vitae gubergren consectetuer, per adipiscing vituperata quaerendum
                            cu. Liber audire eu has, utroque veritus ad nec, reque admodum mel eu. Ea dico debitis
                            docendi ius. Eimea mucius persius, et usu aeque simul graeco, purto accusata usu ad.</p>
                    </AccordionSection>

                    <AccordionSection title="JCPenney Rewards & Credit" index={2}>
                        <p>Lorem ipsum dolor sit amet, pro ex sanctus propriae, vel fugit latine accusata ex. Ferri
                            erroribus quiut, id eum vitae gubergren consectetuer, per adipiscing vituperata quaerendum
                            cu. Liber audire eu has, utroque veritus ad nec, reque admodum mel eu. Ea dico debitis
                            docendi ius. Eimea mucius persius, et usu aeque simul graeco, purto accusata usu ad.</p>
                        <div className={styles.imageBlock}>
                            <Image
                                src="http://s7d9.scene7.com/is/image/JCPenney//DP1003201417030645M?$department_main$"
                                alt="Sample alt text"
                            />
                        </div>
                    </AccordionSection>
                </Accordion>

                <br />
                <p> Accordion with custom rendering -
                    Content of Accordion section will render only when accordion section is expanded.</p>
                <hr />


            </div>
        ),
    },
];

export default stories;
