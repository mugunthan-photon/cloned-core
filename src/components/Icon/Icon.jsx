import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames/bind';
import Type from './type';
import styles from './Icon.css';

const cx = classNames.bind(styles);
/**
 *
 *
 * Icon component to standardize the styling and html structure of any Icon component on the page
 * Examples of using this component
 * Variant 1: type svg
 * <Icon type="svg" width="16" height="16" viewBox="0 0 1024 1024" pathValue="M608 192h160v-192h-160c-123.514 0-224 100.486-224 224v96h-128v192h128v512h192v-512h160l32-192h-192v-96c0-17.346 14.654-32 32-32z"/>
 * Variant 2: type icon
 * <Icon type="icon" classNames='fa fa-cloud' />
 */
class Icon extends PureComponent {

    /**
     * PropTypes to Indicate types of each Props for the entire component
     * Supported React properties
     * @type {Object}
     */
    static propTypes = {
        /**
         * classes that can be passed to component
         * so that it can be added to the element
         */
        className: PropTypes.string,
        /**
         * classes that can be passed to component
         * using this we can fill color to svg and many class changes
         */
        pathClassName: PropTypes.string,
        /**
         * Type of Icon that needs to be created
         * 1) svg: Icons using SVG
         *    Props needed for SVG: width, height, viewBox, pathValue and classes
         * 2) icon: Span for Icons
         *    Props needed for Icons are classes
         *    Default type : icon
         */
        iconType: PropTypes.string,
        /**
         * Width attribute for SVG element
         */
        width: PropTypes.string,
        /**
         * Height attribute for SVG element
         */
        height: PropTypes.string,
        /**
         * Name description  for the Icon (xlinkHref attribute for svg id)
         */
        name: PropTypes.string,
        /**
         * View box attribute for SVG
         */
        viewBox: PropTypes.string,
        /**
         * Unique name for referencing dom element in automation testing
         * @type {String}
         */
        automationId: PropTypes.string,

    }

    static contextTypes = {
        router: PropTypes.oneOfType([PropTypes.object]).isRequired,
    }

    static defaultProps = {
        iconType: Type.ICON,
        className: '',
        width: '16px',
        height: '16px',
        viewBox: '0 0 1024 1024',
        name: '',
        pathClassName: '',
        automationId: '',
    };

    render() {
        const { className, iconType, width, height, viewBox, name, pathClassName, automationId } = this.props;
        const iconClasses = cx('icon-main', ...(className.split(' ')));
        const xlinkHrefName = (`#${name}`);
        if (iconType === Type.SVG) {
            return (
                <svg
                    data-automation-id={automationId}
                    className={iconClasses}
                    width={width}
                    height={height}
                    viewBox={viewBox}
                >
                    <use xlinkHref={xlinkHrefName} className={pathClassName} />
                </svg>
            );
        }
        return (
            <span data-automation-id={automationId} className={iconClasses} />
        );
    }
}

export default Icon;
