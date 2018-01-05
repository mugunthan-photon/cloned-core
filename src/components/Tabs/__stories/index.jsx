import React from 'react';
import { Tabs, TabPanel } from '../Tabs';
import Title from '../Title';
import Content from '../Content';
import Image from '../../Image/Image';
import Icon from '../../Icon/Icon';
import * as styles from './storyBookTheme.css';

// Pass your Custom Theme in Here
const myTheme = {
    tabContainerClass: styles.tab,
    tabPanelContentClass: styles.tabPanelContent,
    tabListItemClass: styles.tabListItem,
    tabButtonClass: styles.tabButton,
    tabPanelTitleClass: styles.tabPanelTitle,
    tabActiveClass: styles.active,
};

const stories = [
    {
        name: 'Tabs',
        story: () => (
            <div>
                <div>
                    <Tabs activeTabPanelIndex={0} alignTabPanelTitles="center" automationId="Rating-Tabs">
                        <TabPanel title="Rating & Review" index={0}>
                            <Title> Rating & Review </Title>
                            <Content> <p>London is the capital of England.</p> </Content>
                        </TabPanel>
                        <TabPanel title="Comments" index={1}>
                            <Title> Comments </Title>
                            <Content>
                                <p>Paris is the capital of France.</p>
                                <Image
                                    src="http://s7d9.scene7.com/is/image/JCPenney//DP1003201417030645M?$department_main$"
                                    alt="Sample alt text"
                                />
                            </Content>
                        </TabPanel>
                        <TabPanel title="Third Tab" index={2}>
                            <Title>  Third Tab </Title>
                            <Content>
                                <p>Lorem ipsum dolor sit amet, pro ex sanctus propriae, vel fugit latine accusata
                                ex. Ferri erroribus quiut, id eum vitae gubergren consectetuer, per
                                adipiscing vituperata cu. Liber audire eu has, utroque veritus ad nec,
                                reque admodum mel eu. Ea dico debitis docendi ius. Eimea mucius persius,
                                et usu aeque simul graeco, purto accusata usu ad.</p>
                            </Content>
                        </TabPanel>
                    </Tabs>
                </div>


                <br />
                <br />

                <div>
                    <Tabs activeTabPanelIndex={2} automationId="Comment-Tabs">
                        <TabPanel title="Rating & Review" index={0}>
                            <Title> Rating & Review </Title>
                            <Content> <p>London is the capital of England.</p> </Content>
                        </TabPanel>
                        <TabPanel title="Comments" index={1}>
                            <Title> Comments </Title>
                            <Content>
                                <p>Paris is the capital of France.</p>
                                <Image
                                    src="http://s7d9.scene7.com/is/image/JCPenney//DP1003201417030645M?$department_main$"
                                    alt="Sample alt text"
                                />
                            </Content>
                        </TabPanel>
                        <TabPanel title="Third Tab" index={2}>
                            <Title> Third Tab </Title>
                            <p>Lorem ipsum dolor sit amet, pro ex sanctus propriae, vel fugit latine accusata ex. Ferri
                                erroribus quiut, id eum vitae gubergren consectetuer, per adipiscing vituperata
                                cu. Liber audire eu has, utroque veritus ad nec, reque admodum mel eu. Ea dico debitis
                                docendi ius. Eimea mucius persius, et usu aeque simul graeco, purto accusata usu ad.</p>
                        </TabPanel>
                    </Tabs>
                </div>


                <br />
                <br />

                <div>
                    <Tabs activeTabPanelIndex={0} alignTabPanelTitles="center" automationId="Design-Tabs">
                        <TabPanel title="Rating & Review" index={0}>
                            <Title> <Icon iconType="svg" automationId="test-automation-icon" width="20" height="20" viewBox="0 0 35 35" name="account-fill" pathClassName={styles.iconPath} /> Rating & Review </Title>
                            <Content>
                                <p>London is the capital of England.</p>
                            </Content>
                        </TabPanel>
                        <TabPanel title="Comments" index={1}>
                            <Title> <Icon iconType="svg" automationId="test-automation-icon" width="20" height="20" viewBox="0 0 35 35" name="account-fill" pathClassName={styles.iconPath} /> Comments with component </Title>
                            <Content>
                                <p>Paris is the capital of France.</p>
                                <Image
                                    src="http://s7d9.scene7.com/is/image/JCPenney//DP1003201417030645M?$department_main$"
                                    alt="Sample alt text"
                                />
                            </Content>
                        </TabPanel>
                        <TabPanel title="Third Tab" index={2}>
                            <Title> <Icon iconType="svg" automationId="test-automation-icon" width="20" height="20" viewBox="0 0 35 35" name="account-fill" pathClassName={styles.iconPath} /> Third Tab </Title>
                            <Content>
                                <p>Lorem ipsum dolor sit amet, pro ex sanctus propriae, vel fugit latine
                                accusata ex. Ferrierroribus quiut, id eum vitae gubergren consectetuer,
                                per adipiscing vituperatacu. Liber audire eu has, utroque veritus ad nec,
                                reque admodum mel eu. Ea dico debitisdocendi ius. Eimea mucius persius,
                                et usu aeque simul graeco, purto accusata usu ad.</p>
                            </Content>
                        </TabPanel>
                    </Tabs>
                </div>

                <br />
                <br />

                <div>
                    <Tabs themeConfig={myTheme} alignTabPanelTitles="end" automationId="Theme-tabs">
                        <TabPanel title="Rating & Review" index={0}>
                            <Title> Rating & Review </Title>
                            <p>London is the capital of England.</p>
                        </TabPanel>
                        <TabPanel title="Comments" index={1}>
                            <Title> Comments </Title>
                            <Content>
                                <p>Paris is the capital of France.</p>
                                <Image
                                    src="http://s7d9.scene7.com/is/image/JCPenney//DP1003201417030645M?$department_main$"
                                    alt="Sample alt text"
                                />
                            </Content>
                        </TabPanel>
                        <TabPanel title="Third Tab" index={2}>
                            <Title> Third Tab </Title>
                            <p>Lorem ipsum dolor sit amet, pro ex sanctus propriae, vel fugit latine accusata ex. Ferri
                                erroribus quiut, id eum vitae gubergren consectetuer, per adipiscing vituperata
                                cu. Liber audire eu has, utroque veritus ad nec, reque admodum mel eu. Ea dico debitis
                                docendi ius. Eimea mucius persius, et usu aeque simul graeco, purto accusata usu ad.</p>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        ),
    },
];

export default stories;

