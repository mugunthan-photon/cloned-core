import React, { Children, cloneElement, Component, PropTypes } from 'react';
import * as styles from './Accordion.css';

/**
 * Accordion component to display any HTML elements or Components within it,a wrapper compoenent for AccordionSection.
 * Currently it supports default opening  of AccordionSection, Toggling same pane,Toggling different panes . Also support
 * theming
 *
 * Many components could be of Accordion view. E.g Filter options for Filtering search results, Footer contents
 * Product summary page with Review,Product detail  etc in Accordion view
 */

class Accordion extends Component {

   /**
    * accordionInstanceCount
    * Keeps track of number of instances
    * of the component
    * @type {number}
    */
    static accordionInstanceCount = 0;

    /**
     * Supported React properties
     * @type {Object}
     */
    static propTypes = {

        /**
         * Default selectedAccordionSectionIndex
         * selectedAccordionSectionIndex will automatically open
         * if not given then all panes will be closed
         * @type {number}
         */
        selectedAccordionSectionIndex: PropTypes.number,

        /**
         * isAutoCollapsible will open the selected pane
         * and auto closes other panes
         * i.e, only one pane will be open at a time
         * @type {boolean}
         */
        isAutoCollapsible: PropTypes.bool.isRequired,

        /**
         * themeConfig will help in applying a different theme
         * i.e, User can override the default theme by passing
         * themeConfig as props
         * @type {boolean}
         */
        themeConfig: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,

        /**
         * Children nodes of Accordion wrapper
         * @type {node}
         */
        children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),

        /**
         * toExpandAll will keep open all the tabs by default
         * it needs isAutoCollapsible false to work
         * @type {boolean}
         */

        /**
         * Unique name for referencing dom element in automation testing
         * @type {String}
         */

        automationId: PropTypes.string,

        /**
         * Checking whether the isAutoCollapsible and toExpandAll set to true
         */
        toExpandAll(props, propName, componentName) {
            let error;

            if (props.isAutoCollapsible && props.toExpandAll) {
                error = new Error(`validation failed: invalid prop '${propName}' supplied to '${componentName}'.`);
            }

            return error;
        },
        onSelect: PropTypes.func,
    };

    /** @properties {Default set up} [optonal props set] */
    static defaultProps = {
        selectedAccordionSectionIndex: -1,
        toExpandAll: false,
        themeConfig: [],
        children: {},
        automationId: '',
        onSelect: null,
    };

    /**
     * Gets the theme to use
     * @return {[Object]} [theming classes]
     */
    static getThemeConfig(themeConfig) {
        return Object.assign({}, {
            accordionContainerClass: styles.accordion,
            accordionSectionClass: styles.accordionSection,
            accordionActiveClass: styles.selected,
            accordionTitleClass: styles.panelHeader,
            accordionPanelClass: styles.panel,
            accordionIconClass: styles.iconBlock,
        }, themeConfig);
    }

    constructor(props) {
        super(props);
        /* istanbul ignore next */

        this.onAccordionSectionSelect = this.onAccordionSectionSelect.bind(this);
        this.themeConfig = Accordion.getThemeConfig(props.themeConfig);
        /**
         * Generating Uniqueid for identifiying each accordion for Accessibility
         * Utils function will be used here
         */
        Accordion.accordionInstanceCount += 1;
        this.accordionKey = Accordion.accordionInstanceCount;

        this.state = {
            selectedAccordionSectionIndex: props.selectedAccordionSectionIndex,
        };
    }

    /**
     * @callback function for the onSelect props
     * updating the selectedAccordionSectionIndex Pane and selectedAccordionSectionIndex state
     */
    onAccordionSectionSelect(selectedAccordionSectionIndex) {
        /**
         * Set the selectedAccordionSectionIndex in here
         * if the same accordion section is clicked again setting it to -1 to close it.
         */
        this.setState((prevState) => {
            const isAccordionSelected = prevState.selectedAccordionSectionIndex === selectedAccordionSectionIndex;
            const selectedIndex = (isAccordionSelected) ? -1 : selectedAccordionSectionIndex;

            if (!isAccordionSelected && this.props.onSelect) {
                this.props.onSelect(selectedAccordionSectionIndex);
            }

            return {
                selectedAccordionSectionIndex: selectedIndex,
            };
        });
    }

    /**
     * Cloned child with props
     * @return {[cloned child Object]} [updated props on child]
     */
    getAccordionSectionConfig(accordionSection) {
        const accordionSectionIndex = accordionSection.props.index;
        const status = (accordionSectionIndex === this.state.selectedAccordionSectionIndex || this.props.toExpandAll);
        const selectedStatus = status ? { isSelected: true } : null;
        return cloneElement(accordionSection, {
            key: accordionSectionIndex,
            isAutoCollapsible: this.props.isAutoCollapsible,
            onSelect: this.onAccordionSectionSelect,
            toExpandAll: this.props.toExpandAll,
            themeConfig: this.themeConfig,
            accordionKey: this.accordionKey,
            ...selectedStatus,
        });
    }

    /**
     * Renders all the children inside it
     * @return {[type]} [description]
     */
    render() {
        // Use Children to map and clone with the props and see how it goes in here
        const childAccordionSections = Children.map(this.props.children, this.getAccordionSectionConfig, this);
        const { automationId } = this.props;
        return (
            <div role="tablist" className={this.themeConfig.accordionContainerClass} data-automation-id={automationId}>
                {childAccordionSections}
            </div>
        );
    }
}

export default Accordion;
