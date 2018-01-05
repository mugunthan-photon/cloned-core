import React from 'react';
import Icon from '../Icon';
import styles from '../Icon.css';

const stories = [
    {
        name: 'Icon',
        story: () => (
            <Icon iconType="svg" automationId="test-automation-icon" width="35px" height="35px" viewBox="0 0 35 35" name="account-fill" pathClassName={styles.iconPath} />
        ),
    },
];

export default stories;
