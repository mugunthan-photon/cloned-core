import React, { Component, PropTypes, cloneElement, Children } from 'react';
import classNames from 'classnames/bind';
import TabPanel from './TabPanel';
import * as styles from './Tabs.css';

const cx = classNames.bind(styles);
/**
 * Tabs component helps in showing relevent data on clicking relevant tabs
 * It supports the following features
 *
 *  Alignment - left, right, center
 *  defaultActive Tab index to be shown
 */

class Tabs extends Component {

    /**
     * Supported React properties
     * @type {Object}
     */
    static propTypes = {

        /**
         * activeTabPanelIndex will select the Panel
         * content to display by default
         * @type {node}
         */
        activeTabPanelIndex: PropTypes.number,


        /**
         * alignTabPanelTitles helps in aligning titles in start ,center and end
         * @type {enum}
         */
        alignTabPanelTitles: PropTypes.oneOf(['start', 'center', 'end']),


        /**
         * themeConfig will help in applying a different theme
         * i.e, User can override the default theme by passing
         * themeConfig as props
         * @type {boolean}
         */
        themeConfig: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),

        /**
         * automationId for Testing
         * keep this unique in page
         * @type {node}
         */
        automationId: PropTypes.string.isRequired,

        /**
         * Children nodes of Tabs
         * @type {node}
         */
        children: PropTypes.node.isRequired,
        closeOnDBClick: PropTypes.bool,
        onTabChange: PropTypes.func,
    };

    /** @properties {Default set up} [optonal props set] */
    static defaultProps = {
        activeTabPanelIndex: null,
        alignTabPanelTitles: 'start',
        themeConfig: [],
        closeOnDBClick: false,
        onTabChange: () => {},
    };


    /**
     * Gets the theme to use
     * @return {[Object]} [theming classes]
     */
    static getThemeConfig(themeConfig) {
        return Object.assign({}, {
            tabMainClass: styles.tabMain,
            tabContainerClass: styles.tab,
            tabPanelContentClass: styles.tabPanelContent,
            tabListItemClass: styles.tabListItem,
            tabButtonClass: styles.tabButton,
            tabPanelTitleClass: styles.tabPanelTitle,
            tabActiveClass: styles.active,
        }, themeConfig);
    }


    constructor(props) {
        super(props);
        /* istanbul ignore next */

        // Binding methods and getting config
        this.onTabSelect = this.onTabSelect.bind(this);
        this.state = {
            activeTabPanelIndex: props.activeTabPanelIndex,
        };
    }

    componentWillReceiveProps(nextProps) {
        // SetState only when the index is different
        if ((nextProps.activeTabPanelIndex !== null)
                && (this.props.activeTabPanelIndex !== nextProps.activeTabPanelIndex)) {
            this.activePanelContent = null;
            this.activeTitle = null;
            this.setState({
                activeTabPanelIndex: nextProps.activeTabPanelIndex,
            });
        } else if (nextProps.activeTabPanelIndex === null) {
            this.setState({
                activeTabPanelIndex: null,
            });
        }
    }

    /**
     * onTabSelect helps in setting activeTabPanelIndex
     */
    onTabSelect(index) {
        if (this.state.activeTabPanelIndex === index && this.props.closeOnDBClick) {
            this.setState({
                activeTabPanelIndex: null,
            });
        } else if (this.state.activeTabPanelIndex !== index) {
            this.setState({
                activeTabPanelIndex: index,
            });
        }
        this.props.onTabChange(index);
    }

    /**
     * Cloned child with props
     * @return {[cloned child Object]} [updated props on child]
     */
    getTabContentConfig(tabContent, mapIndex) {
        const tabProps = tabContent.props;
        const tabPanelIndex = tabProps.index;
        const isTabActive = tabPanelIndex === this.state.activeTabPanelIndex;
        if (isTabActive) {
            this.activePanelContent = tabProps.children[1].props.children;
            this.activeTitle = tabProps.title;
        }

        return cloneElement(tabContent, {
            key: tabPanelIndex,
            id: `tab${mapIndex}`,
            isTabActive: (tabPanelIndex === this.state.activeTabPanelIndex),
            onSelect: this.onTabSelect,
            themeConfig: Tabs.getThemeConfig(this.props.themeConfig),
            automationId: this.props.automationId,
        });
    }

    /**
     * Renders all the children inside it
     * @return {[type]} [description]
     */
    render() {
        // Use Children to map and clone with the props and see how it goes in here
        const childTabContents = Children.map(this.props.children, this.getTabContentConfig, this);
        const { themeConfig } = this.props;

        const tabContainerClass = cx({
            [`${themeConfig.tabContainerClass}`]: true,
            [`${styles[this.props.alignTabPanelTitles]}`]: true,
        });
        return (
            <div role="tablist" className={themeConfig.tabMainClass}>
                <ul className={tabContainerClass}>
                    {childTabContents}
                </ul>
                {
                    (this.state.activeTabPanelIndex != null) ?
                        <div aria-label={this.activeTitle} role="tabpanel" className={themeConfig.tabPanelContentClass}>
                            {this.activePanelContent}
                        </div> : null
                }
            </div>
        );
    }
}

/*
* Exporting both the Components here so that the consumer
* can consume one Base component and use it
*/

module.exports = {
    Tabs,
    TabPanel,
};
