import React from 'react';
import Carousel from '../Carousel';
import Icon from '../../Icon/Icon';
import Button from '../../Button/Button';
import styles from '../../Icon/Icon.css';
import carouselData from './mock';
import pdpstyles from './theme.css';

const carouselListItem = dataItem => (
    <div>
        <img src={dataItem.src} alt={dataItem.alt} />
    </div>
);

const leftSlotContainer = (<div>
    <Button type="button" automationId="test-automation-btn-0" onClick={() => console.log('hi')} >
        <Icon iconType="svg" automationId="test-automation-icon" width="35px" height="35px" viewBox="0 0 35 35" name="account-fill" pathClassName={styles.iconPath} />
    </Button>
</div>);

const pdpcarouselTheme = {
    carouselBullets: pdpstyles.carouselBullets,
};

const stories = [
    {
        name: 'Carousel',
        story: () => (
            <div>
                <h3> Carousel with themeConfig and Left slot enabled </h3>
                <Carousel
                    carouselData={carouselData}
                    carouselItemRenderer={carouselListItem}
                    automationId="test-automation-carousel"
                    bottomLeftSlot={leftSlotContainer}
                    themeConfig={pdpcarouselTheme}
                />
                <h3> Basic Carousel with default theme</h3>
                <Carousel
                    carouselData={carouselData}
                    carouselItemRenderer={carouselListItem}
                    automationId="test-automation-carousel"
                />
            </div>
        ),
    },
];

export default stories;
