import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import * as styles from './Tabs.css';

const cx = classNames.bind(styles);
/**
 * TabPanel component renders the TabPanelList title and hooks a callbackmethod onclick.
 * It is the child component of Tabs
 *
 * Helps in making the component loosely coupled so that it can be consumed easily
 */
class TabPanel extends Component {
    /**
     * Supported React properties
     * @type {Object}
     */
    static propTypes = {
        /**
         * Unique id for identifying each TabPanel section
         * @mandatory prop
         * @type {number}
         */
        index: PropTypes.number.isRequired,

        /**
         * TabPanel title
         * @mandatory prop
         * @type {string}
         */
        // title: PropTypes.string.isRequired,

        /**
         * isTabActive panel
         * @optional prop
         * @type {boolean}
         */
        isTabActive: PropTypes.bool.isRequired,

        /**
         * id for Accessibility
         * @optional prop
         * @type {boolean}
         */
        onSelect: PropTypes.func.isRequired,

        /**
         * id for Accessibility
         * @optional prop
         * @type {boolean}
         */
        id: PropTypes.string,

        /**
         * automationId for Testing
         * keep this unique in page
         * @type {node}
         */
        automationId: PropTypes.string,

        /**
         * themeConfig provides custom theming capabilities
         * @madatory prop
         * takes default theming or user defined custom theme
         * @type {enum}
         */
        themeConfig: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),

        children: PropTypes.node,

    };

    /** @properties {Default set up} [optional props set] */
    static defaultProps = {
        isTabActive: false,
        themeConfig: [],
        onSelect: function onSelect(index) { return index; },
        id: 'tab0',
        children: null,
        automationId: '',
    }

    constructor(props) {
        super(props);
        /* istanbul ignore next */

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        /** Tells the parent Tabs component that this Tab was clicked
         */
        this.props.onSelect(this.props.index);
    }

    /**
     * Renders all the childrens inside it
     * @return {[type]} [description]
     */
    render() {
        const { isTabActive, themeConfig, id, children, automationId } = this.props;
        const automationData = `${automationId}-${id}`;
        /**
         * Logic for adding active class ,
         * concatinating classes using classNames npm modules bind  method
         */

        const containerClass = cx({
            [`${themeConfig.tabListItemClass}`]: true,
            [`${themeConfig.tabActiveClass}`]: isTabActive,
        });

        return (
            <li className={containerClass} id={id} data-automation-id={automationData} aria-expanded={isTabActive}>
                <button
                    className={cx(themeConfig.tabButtonClass)}
                    role="tab" aria-selected={isTabActive}
                    onClick={this.handleClick} >
                    <label className={themeConfig.tabPanelTitleClass} htmlFor={id}>
                        {children[0].props.children}
                    </label>
                </button>
            </li>
        );
    }
}

export default TabPanel;
