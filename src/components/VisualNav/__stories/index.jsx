import React from 'react';
import { VisualNav } from '../../';
import mockData from './MockData';
import * as styles from './storyBookTheme.css';

// Pass your Custom Theme in Here
const myTheme = {
    visNavGridTilesClass: styles.gridTiles,
    visNavWrapper: styles.wrapper,
};

const stories = [{
    name: 'VisualNav',
    story: () => (
        <VisualNav themeConfig={myTheme} direction="Fluid" datasource={mockData} navTitle="Shop Departments" automationId="test-automation-deplist" />
      ),
}];

export default stories;
