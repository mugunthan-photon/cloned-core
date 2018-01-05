import React from 'react';
import classNames from 'classnames/bind';
import Loader from '../Loader';
/* importing { classNames and styles } only to show
** two different types of loader in storybook
*/
import styles from './styles.css';

const cx = classNames.bind(styles);
const stories = [
    {
        name: 'Loader',
        story: () => (
            <div className={cx('loader-wrapper-strybk')}>
                <div className={cx('loader-only-strybk')}>
                    <h3>Loader without overlay</h3>
                    <Loader automationId="test-automation-loader-0" />
                </div>
                <div className={cx('loader-with-overlay-strybk')}>
                    <h3>Loader with overlay</h3>
                    <Loader keepOverlay automationId="test-automation-loader-1" />
                </div>
            </div>
        ),
    },
];

export default stories;
