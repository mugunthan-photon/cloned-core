import React from 'react';
import { BreadCrumbs, Crumbs } from '../../';
import * as styles from './storyBookTheme.css';

const myTheme = {
    crumbContainerClass: styles.crumbContainer,
    crumbListItemClass: styles.crumbListItem,
    crumbLinksClass: styles.crumbLinks,
    crumbActiveClass: styles.active,
};

const stories = [
    {
        name: 'BreadCrumbs',
        story: () => (
            <div>
                <BreadCrumbs separator="slash">
                    <Crumbs path="/path/Jcpenney">JCPenney</Crumbs>
                    <Crumbs path="/path/Appliances">Appliances</Crumbs>
                    <Crumbs isActive> Refrigirators <span>(24442)</span></Crumbs>
                </BreadCrumbs>

                <br />

                <BreadCrumbs separator="arrow">
                    <Crumbs path="/path/Jcpenney">JCPenney</Crumbs>
                    <Crumbs path="/path/Appliances">Appliances</Crumbs>
                    <Crumbs isActive>Refrigirators</Crumbs>
                </BreadCrumbs>

                <br />

                <BreadCrumbs seperator="none" themeConfig={myTheme}>
                    <Crumbs path="/path/Jcpenney">JCPenney</Crumbs>
                    <Crumbs path="/path/Appliances">Appliances</Crumbs>
                    <Crumbs isActive>Refrigirators</Crumbs>
                </BreadCrumbs>

            </div>
        ),
    },
];

export default stories;
