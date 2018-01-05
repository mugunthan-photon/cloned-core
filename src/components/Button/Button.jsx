import classNames from 'classnames/bind';
import React, { Component, PropTypes } from 'react';
import * as styles from './Button.css';

const cx = classNames.bind(styles);

/**
 * Button component to standardize the styling and html structure of any button component on the page
 * This supports "buttonType: type of button" such as default, primary or others ; "size :size of button" (large, small and Extra Small)
 * */

const BUTTON_SIZES = ['Default', 'Lg', 'Md', 'Sm', 'Xl'];

const BUTTON_TYPES = [
    'Default',
    'Primary',
    'Secondary',
    'Tertiary',
    'Text',
    'Link',
];

const BUTTON = [
    'submit',
    'button',
];

class Button extends Component {

    /**
     * Supported React properties
     * @type {Object}
     */
    static propTypes = {
        size: PropTypes.oneOf(BUTTON_SIZES),
        buttonType: PropTypes.oneOf(BUTTON_TYPES),
        type: PropTypes.oneOf(BUTTON),
        className: PropTypes.string,
        onClick: PropTypes.func,
        children: PropTypes.node,
        isDisabled: PropTypes.bool,
        automationId: PropTypes.string,
        onBlur: PropTypes.func,
        ellipsis: PropTypes.bool,
    };

    /** @properties {Default set up} */
    static defaultProps = {
        buttonType: 'Default',
        size: 'Default',
        type: 'button',
        className: '',
        onClick: null,
        children: null,
        isDisabled: false,
        automationId: 'at-button-default-id',
        onBlur: null,
        ellipsis: false,
    };

    /**
     * Renders the basic outer skeleton required to render the button
     * @return {ReactComponent}
     * {children} is used to pass icons (span or svg) and button value
     */
    render() {
        const { className, children, size, buttonType, type, onClick,
            isDisabled, automationId, onBlur, ellipsis } = this.props;

        const buttonClass = cx(
            'btn',
            size
                ? (`btn${size}`)
                : null,
            (`btn${buttonType}`),
            className,
            ellipsis ? 'btnEllipsis' : '',
        );

        // Entire ReactDOM
        return (
            <button
                data-automation-id={automationId}
                disabled={isDisabled}
                type={type}
                onClick={onClick}
                onBlur={onBlur}
                className={buttonClass}
                >{children}</button>
        );
    }
}
export default Button;
