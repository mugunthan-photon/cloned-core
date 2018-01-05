import classNames from 'classnames/bind';
import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import * as styles from './BreadCrumbs.css';

const cx = classNames.bind(styles);
/**
 * component to display any HTML elements or Components within it,a wrapper compoenent for Crumbs.
 * Currently it supports separator config and . Also support
 * theming
 *
 * Crumbs can be used at many places. E.g Departments,Product Details, Search/Browse
 */

class Crumbs extends Component {

    /**
     * Supported React properties
     * @type {Object}
     */
    static propTypes = {

        /**
         * Children nodes of crumbs
         * @type {node}
         */
        children: PropTypes.node,

        /**
         * Active crumb
         * @type {node}
         */
        isActive: PropTypes.bool,

        /**
         * separator for each crumb
         * @type {node}
         */
        separator: PropTypes.string,

        /**
         * themeConfig provides custom theming capabilities
         * @mandatory prop
         * takes default theming or user defined custom theme
         * @type {object}
         */
        themeConfig: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),

        /**
         * path link to take user to the respective URL
         * @mandatory prop
         * @type {string}
         */
        path: PropTypes.string,

        /**
         * it is a flag to decide soft routing or hard reload
         * @type {boolean}
         */
        softRoute: PropTypes.bool,

        /**
         * it is a click event property. If assigned click event
         * will be attached to crumb link
         */
        onClick: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    };

    /** @properties {Default set up} [optonal props set] */
    static defaultProps = {
        children: {},
        isActive: false,
        separator: 'none',
        themeConfig: [],
        path: null,
        softRoute: false,
        onClick: false,
    };

    constructor(props) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(e) {
        e.stopPropagation();

        const { onClick, softRoute, path } = this.props;
        /* istanbul ignore else */
        if (typeof onClick === 'function') {
            onClick(e);
        } else if (softRoute) {
            e.preventDefault();
            // soft route to the target url
            browserHistory.push(path);
        }
    }

    createLink(crumbThemeClass, path, children) {
        const { onClick, softRoute } = this.props;
        const linkProps = {
            className: crumbThemeClass,
            href: path,
        };
        if (typeof onClick === 'function' || softRoute) {
            linkProps.onClick = this.clickHandler;
        }
        return (
            <a {...linkProps}>
                <span>{children}</span>
            </a>
        );
    }

    /**
     * Renders all the children inside it
     * @return {[type]} [description]
     */
    render() {
        /** Props abstracted */
        const { themeConfig, children, isActive, separator, path } = this.props;
        const separatorClass = (separator !== 'none') || false;
        /**
         * Based on separator the class is added dynamically
         * @type {[type]}
         */
        const crumbThemeClass = cx({
            [`${themeConfig.crumbLinksClass}`]: true,
            [`${styles[separator]}`]: separatorClass,
        });

        let crumbs;

        if (isActive) {
            crumbs = (
                <li className={cx(themeConfig.crumbListItemClass, themeConfig.activeClass)}>
                    {children}
                </li>
            );
        } else {
            crumbs = (
                <li className={themeConfig.crumbListItemClass}>
                    {this.createLink(crumbThemeClass, path, children)}
                </li>
            );
        }

        return crumbs;
    }
}

export default Crumbs;
