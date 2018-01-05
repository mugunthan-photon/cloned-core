import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import config from './SocialShare.config';
import * as styles from './SocialShare.css';
import Icon from '../Icon/Icon';

const cx = classNames.bind(styles);
/**
 * Social Icon component to display social icons
 * Examples of using social Icons
 *  <SocialShare  iconClass="social-share" socialShareIcons={["FACEBOOK", "TWITTER", "GOOGLEPLUS"]}/>
 */

class SocialShare extends Component {

    /**
     * PropTypes to Indicate types of each Props for the entire component
     * Supported React properties
     * @type {Object}
     */
    static propTypes = {
        /**
         * Array of social icons that has to be shown
         * Takes following Values
         * FACEBOOK, TWITTER, GOOGLEPLUS, PINTEREST
         */
        socialShareIcons: PropTypes.arrayOf(PropTypes.string),

        /**
         * Space seperated classes for the component
         */
        iconClass: PropTypes.string,

        /**
         * Unique name for referencing dom element in automation testing
         * @type {String}
         */
        automationId: PropTypes.string,
    };

    static defaultProps = {
        socialShareIcons: '',
        iconClass: '',
        automationId: '',
    };

    render() {
        const { socialShareIcons, iconClass, automationId } = this.props;
        const socialShareIconClasses = cx('socialShareIcons', ...(iconClass.split(' ')));

        return (
            <div className={styles.socialShareIconWrapper}>
                {
                    socialShareIcons.map((name, index) => {
                        const socialIcon = config.icons[name];
                        const socialIndex = index;

                        return (
                            <a
                                data-automation-id={automationId} className={styles.socialAnchor} href={socialIcon.url}
                                key={socialIndex} aria-label={`Icon - External Link ${name}`} target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Icon
                                    automationId={`icon-${automationId}`} iconType="svg" width="35px" height="35px"
                                    viewBox="0 0 35 35" classNames={socialShareIconClasses}
                                    name={socialIcon.svgName}
                                />
                            </a>
                        );
                    })
                }
            </div>
        );
    }
}

export default SocialShare;
