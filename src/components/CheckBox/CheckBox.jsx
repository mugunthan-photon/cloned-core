import React, { Component, PropTypes } from 'react';
import FastClick from 'react-fastclick-alt';
import classNames from 'classnames/bind';
import styles from './CheckBox.css';

const cx = classNames.bind(styles);

class CheckBox extends Component {

    /**
     * Supported React properties
     * @type {Object}
     * config.id is used to assign id to checkbox, *required field.
     * config.defaultChecked accepts boolean, if true is passed then by default it will be checked
     * config.value is used to assign value to checkbox
     * config.name is used to assign name to checkbox
     * refcallback is a callback function which gives the context of the component
     * disabled accepts boolean value, pass true to disable checkbox
    */

    static propTypes = {
        label: PropTypes.oneOfType([PropTypes.func, PropTypes.children]).isRequired,
        config: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
        onClick: PropTypes.func,
        onChange: PropTypes.func,
        refCallBack: PropTypes.func,
        theme: PropTypes.string,
        labelClass: PropTypes.string,
        disabled: PropTypes.bool,
        automationId: PropTypes.string,
        enableFastClick: PropTypes.bool,
        labelContainerClass: PropTypes.string,
    };

    /** @properties {Default set up} */
    static defaultProps = {
        onClick: () => {},
        onChange: () => {},
        refCallBack: () => {},
        theme: null,
        labelClass: '',
        disabled: false,
        automationId: 'at-checkbox-default-id',
        enableFastClick: false,
        labelContainerClass: '',
    };

    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onClick(event) {
        this.props.onClick(event);
    }

    onChange(event) {
        const eve = {
            value: event.target.value,
        };
        this.props.onChange(eve);
    }

    renderCheckbox() {
        const { label,
            refCallBack,
            labelClass,
            theme,
            config,
            disabled,
            automationId,
            labelContainerClass } = this.props;
        const defaultProps = {
            type: 'checkbox',
            ref: refCallBack,
            className: styles.checkbox,
            onChange: this.onChange,
            onClick: this.onClick,
            ...config,
        };
        return (
            <div className={cx('wrap', theme, 'clear')} key={config.id}>
                {
                    disabled ?
                        <input data-automation-id={`${automationId}-input-disabled`} {...defaultProps} disabled /> :
                        <input data-automation-id={`${automationId}-input`} {...defaultProps} />
                }
                <label htmlFor={config.id} className={cx('label', labelClass)} data-automation-id={`${automationId}-label`}>
                    <div className={cx('labelContainer', labelContainerClass)}>
                        {label}
                    </div>
                </label>
            </div>
        );
    }

    /**
     * Renders check box
     */
    render() {
        const { enableFastClick } = this.props;
        const checkbox = enableFastClick ? <FastClick> { this.renderCheckbox() } </FastClick> : this.renderCheckbox();
        return checkbox;
    }
}

export default CheckBox;
