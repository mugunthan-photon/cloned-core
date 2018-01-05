import React, { Component, PropTypes, Children, cloneElement } from 'react';
import classNames from 'classnames/bind';
import * as styles from './BreadCrumbs.css';

const cx = classNames.bind(styles);
/**
 * BreadCrumbs component to display any HTML elements or Components within it,a wrapper compoenent for Crumbs.
 * Currently it supports separator config and . Also support
 * theming
 *
 * BreadCrumbs can be used at many places. E.g Departments,Product Details, Search/Browse
 */

class BreadCrumbs extends Component {

    /**
     * Supported React properties
     * @type {Object}
     */
    static propTypes = {


        /**
         * Separator between crumbs
         * defaults to none.
         * @type {enum}
         */
        separator: PropTypes.oneOf(['slash', 'arrow', 'none', 'custom']),

        /**
         * themeConfig will help in applying a different theme
         * i.e, User can override the default theme by passing
         * themeConfig as props
         * @type {boolean}
         */
        themeConfig: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,


        /**
         * Children nodes of crumbs
         * @type {node}
         */
        children: PropTypes.node,


    };

    /** @properties {Default set up} [optonal props set] */
    static defaultProps = {
        children: {},
        separator: 'none',
        themeConfig: [],
    };

    /**
     * Gets the theme to use
     * @return {[Object]} [theming classes]
     */
    static getThemeConfig(themeConfig) {
        return Object.assign({}, {
            crumbContainerClass: cx('crumbContainer', 'col12'),
            crumbListItemClass: styles.crumbListItem,
            crumbLinksClass: styles.crumbLinks,
            crumbActiveClass: styles.active,
            crumbsRowClass: styles.row,
        }, themeConfig);
    }


    constructor(props) {
        super(props);
        /* istanbul ignore next */
        /**
         * Generating Uniqueid for identifiying each accordion for Accessibility
         * Utils function will be used here
         */
        this.themeConfig = BreadCrumbs.getThemeConfig(props.themeConfig);
    }

    getCrumbsConfig(accordionSection) {
        return cloneElement(accordionSection, {
            themeConfig: this.themeConfig,
            separator: this.props.separator,
        });
    }

    /**
     * Renders all the children inside it
     * @return {[type]} [description]
     */
    render() {
        // Breadcrumbs configuration and theming
        const crumbs = Children.map(this.props.children, this.getCrumbsConfig, this);
        return (
            <div className={this.themeConfig.crumbsRowClass}>
                <ul className={this.themeConfig.crumbContainerClass}>
                    {crumbs}
                </ul>
            </div>
        );
    }
}

export default BreadCrumbs;

