import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import Image from '../Image/Image';
import * as styles from './Banner.css';

const cx = classNames.bind(styles);

/**
 * Banner component to standardize the styling and html structure of any advertisement/promotion image banner component on the page
 * Currently it support responsive layout occupying 100% width of wrapper HTML element.
 *
 */

class Banner extends Component {
    /**
    * Supported React properties
    * @type {Object}
    */

    static propTypes = {
        /**
         * URL of the related page. Once banner is clicked, it should take the user to the related page.
         * @type {string}
         */
        href: PropTypes.string.isRequired,

        /**
         * source path of the banner image
         * @type {string}
         */
        bannerImageUrl: PropTypes.string.isRequired,

        /**
         * alternative text for the banner image
         * @type {string}
         */
        altText: PropTypes.string.isRequired,

        /**
         * The target prop specifies where to open the linked document.
         * Possible valus are _blank, _self, _parent, _top
         * @type {string}
         */
        target: PropTypes.string.isRequired,

        /**
         * The aria-label attribute is used to define a string that labels the current element.
         * @type {string}
         */
        ariaLabel: PropTypes.string.isRequired,

        /**
         * Unique name for referencing dom element in automation testing
         * @type {String}
         */

        automationId: PropTypes.string,

        /**
         * It is a flag indicating to go for soft routing or hard routing
         * @type {String}
         */

        softRoute: PropTypes.bool,

        /**
         * CSS className for root element
         * @type {String}
         */
        bannerClass: PropTypes.string,
        analyticsTag: PropTypes.string,
        onImageLoad: PropTypes.func,
        onImageError: PropTypes.func,

    }

    static defaultProps = {
        href: '',
        bannerImageUrl: '',
        altText: '',
        target: '',
        automationId: '',
        softRoute: false,
        bannerClass: '',
        analyticsTag: '',
        onImageLoad: () => {},
        onImageError: () => {},
    }

    linkCreation() {
        const { bannerImageUrl, altText, onImageLoad, onImageError } = this.props;
        const imgTag = <Image imageRatio={0} src={bannerImageUrl} alt={altText} automationId="banner-image" onImageLoad={onImageLoad} onImageError={onImageError} />;
        let redirectTag = null;
        let softRouteURL = this.props.href;
        /* istanbul ignore next */
        if (softRouteURL) {
            const analyticsTrackCode = this.props.analyticsTag;
            const matchForCmRe = /cm_re/.test(softRouteURL.toLowerCase());
            if (!matchForCmRe && analyticsTrackCode) {
                const match = /.+\?.*/.test(softRouteURL);
                if (match) {
                    softRouteURL += `&${analyticsTrackCode}`;
                } else {
                    softRouteURL += `?${analyticsTrackCode}`;
                }
            }
        }

        if (softRouteURL) {
            if (this.props.softRoute) {
                redirectTag = (
                    <Link to={softRouteURL}>
                        {imgTag}
                    </Link>
                );
            } else {
                redirectTag = (
                    <a href={softRouteURL} target={this.props.target} aria-label={this.props.ariaLabel} >
                        {imgTag}
                    </a>
                );
            }
        } else {
            redirectTag = (
                <div>
                    {imgTag}
                </div>
            );
        }
        return redirectTag;
    }

    render() {
        const { automationId, bannerClass } = this.props;
        return (
            <div className={cx('banner', bannerClass)} data-automation-id={automationId}>
                {this.linkCreation()}
            </div>
        );
    }
}

export default Banner;
