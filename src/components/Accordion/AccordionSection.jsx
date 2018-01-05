import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import Icon from '../Icon/Icon';
import * as styles from './Accordion.css';

const cx = classNames.bind(styles);
/**
 * Accordion Section component renders each section of Accordion component.
 * It is the child component of Accordion Wrapper
 *
 * Helps in making the component loosely coupled so that it can be consumed easily
 */
class AccordionSection extends Component {
    /**
     * Supported React properties
     * @type {Object}
     */
    static propTypes = {
        /**
         * Unique id for identifying each accordion section
         * @mandatory prop
         * @type {number}
         */
        index: PropTypes.number.isRequired,

        /**
         * Accordion section title
         * @mandatory prop
         * @type {string}
         */
        title: PropTypes.oneOfType(PropTypes.string, PropTypes.node),

        /**
         * isAutoCollapsible will autoClose other panes
         * isAutoCollapsible = false will not autoClose other panes
         * @optional prop
         * @type {boolean}
         */
        isAutoCollapsible: PropTypes.bool,

        /**
         * isSelected pane
         * @optional prop
         * @type {boolean}
         */
        isSelected: PropTypes.bool.isRequired,

        /**
         * onSelect is a  callback on @parent Accordion
         * @prop dependency on isAutoCollapsible prop
         * @type {[type]}
         */
        onSelect: PropTypes.func,

        /**
         * themeConfig provides custom theming capabilities
         * @madatory prop
         * takes default theming or user defined custom theme
         * @type {object}
         */
        themeConfig: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),

        /**
         * toExpandAll helps in expanding all AccordionSections
         * @optional/cloned prop
         * takes default value as false or user defined value
         * @type {object}
         */

        toExpandAll: PropTypes.bool,
        /**
         * Children nodes of Accordion wrapper
         * @type {node}
         */

        children: PropTypes.node,
        /**
         * Unique Accordion key used for Accessibility
         * @mandatory prop
         * @type {number}
         */

        accordionKey: PropTypes.number.isRequired,
        iconConfig: PropTypes.oneOfType([PropTypes.object]),
        willToggle: PropTypes.bool,
        theme: PropTypes.string,
        previewTheme: PropTypes.string,
        previewContent: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
        renderOnExpand: PropTypes.bool,
        id: PropTypes.string,

        /**
         * onSelectAnalytics is a  callback for Analytics for acoordion Section
         * @type {[type]}
         */
        onSelectAnalytics: PropTypes.func,
        /**
         * Custom class for accordionSection container
         * @type {[type]}
         */
        accordionSectionClass: PropTypes.string,
    };

    /** @properties {Default set up} [optional props set] */
    static defaultProps = {
        isAutoCollapsible: true,
        isSelected: false,
        onSelect: function onSelect(val) { return val; },
        themeConfig: [],
        accordionKey: 1,
        children: {},
        toExpandAll: false,
        iconConfig: {
            theme: 'iconTheme',
            viewBox: '0 0 30 30',
            width: '30px',
            height: '30px',
        },
        title: '',
        willToggle: true,
        theme: '',
        previewTheme: '',
        previewContent: '',
        renderOnExpand: false,
        id: null,
        onSelectAnalytics: null,
        accordionSectionClass: '',
    };

    constructor(props) {
        super(props);
        /* istanbul ignore next */
        const isOpen = (props.toExpandAll || props.isSelected || !props.willToggle);
        this.handleClick = this.handleClick.bind(this);
        // isOpen state triggered when isAutoCollapsible prop is set
        this.state = {
            isOpen,
            renderChildren: (!this.props.renderOnExpand || isOpen),
        };
    }

    handleClick() {
        /** Tells the parent Accordion component that this section was clicked
         * (or) set the state depending on the isAutoCollapsible props
         */

        const { isAutoCollapsible, isSelected, index, title } = this.props;
        const isAccordionSectionExpanded = ((isAutoCollapsible && isSelected) ||
              (!isAutoCollapsible && this.state.isOpen));
        this.props.onSelect(index);

        if (this.props.onSelectAnalytics) {
            this.props.onSelectAnalytics(index, title, isAccordionSectionExpanded);
        }

        if (!this.props.isAutoCollapsible) {
            const newState = {
                isOpen: !this.state.isOpen,
            };

            // if render on expand is set true, set render children as true
            if (this.props.renderOnExpand && this.state.renderChildren === false) {
                newState.renderChildren = true;
            }
            this.setState(newState);
        }
        return false;
    }

    /**
     * Renders all the children inside it
     * @return {[type]} [description]
     */
    render() {
        const { themeConfig,
            children,
            title,
            isAutoCollapsible,
            isSelected,
            index,
            accordionKey,
            theme,
            accordionSectionClass,
        } = this.props;
        const isAccordionSectionExpanded = ((isAutoCollapsible && isSelected) ||
            (!isAutoCollapsible && this.state.isOpen));

        /**
         * Based on isAutoCollapsible props state is set
         * @type {[type]}
         */
        const containerClass = cx({
            [`${themeConfig.accordionSectionClass}`]: true,
            [`${themeConfig.accordionActiveClass}`]: isAccordionSectionExpanded,
        });

        const iconState = isAccordionSectionExpanded ? 'icon-minus' : 'icon-plus';
        /**
         * Accessibility Constants to use
         * Basic usage is implemented
         */
        const ariaExpanded = ((isAutoCollapsible && isSelected) || (!isAutoCollapsible && this.state.isOpen));
        const ariaHidden = !((isAutoCollapsible && isSelected) || (!isAutoCollapsible && this.state.isOpen));

        const accordionHeaderId = (`accordionHeader${accordionKey}${index}`);
        const accordionContentId = this.props.id || (`accordionContent${accordionKey}${index}`);
        return (
            <div className={cx(containerClass, theme)} data-automation-id={`accordian-section-${index}`}>
                {(this.props.willToggle !== false) ? <button onClick={this.handleClick} role="tab" tabIndex="0" type="button" className={styles.buttonHeader} data-automation-id="accordian-title" aria-expanded={ariaExpanded} aria-controls={accordionContentId} aria-label={title} >
                    <h3 id={accordionHeaderId} className={themeConfig.accordionTitleClass} >
                        {title}
                        <div className={themeConfig.accordionIconClass} aria-hidden="true" >
                            <Icon iconType="svg" className={cx('svg-icon')} width={this.props.iconConfig.width} height={this.props.iconConfig.height} viewBox={this.props.iconConfig.viewBox} name={iconState} pathClassName={cx(this.props.iconConfig.theme)}/>
                        </div>
                    </h3>
                </button> : <button role="tab" tabIndex="0" type="button" className={styles.buttonHeader} data-automation-id="accordian-title" aria-expanded={ariaExpanded} aria-controls={accordionContentId} aria-label={title} >
                    <h3 id={accordionHeaderId} className={themeConfig.accordionTitleClass} >
                        {title}
                    </h3>
                </button>}
                <div className={this.props.previewTheme}>{this.props.previewContent}</div>
                <div
                    id={accordionContentId}
                    role="tabpanel"
                    data-automation-id="accordian-content"
                    className={cx(themeConfig.accordionPanelClass, accordionSectionClass)}
                    aria-hidden={ariaHidden}
                    aria-labelledby={accordionHeaderId}
                    tabIndex={ariaHidden ? '-1' : '0'}
                >
                    {
                        (this.state.renderChildren) ? <div>{children}</div> : null
                    }
                </div>
            </div>
        );
    }
}

export default AccordionSection;
