import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import isEmpty from 'lodash/isEmpty';
import styles from './RadioButton.css';

const cx = classNames.bind(styles);

/**
 * Radio Button component to standardize the styling and html structure of radio button component on the page
 * This supports "radioType: type of radio button" such as default or error
* */

const RADIO_TYPES = [
    'Default',
    'Error',
];

class RadioButton extends Component {

  /**
   * Supported React properties
   * @type {Object}
   * id is required
   * name Sets or returns the value of the name attribute of a radio button
   * value Sets or returns the value of the value attribute of the radio button
   * isChecked accepts boolean, if true is passed then by default it will be checked
   * isDisabled accepts boolean value, pass true to disabled radio button
   */
    static propTypes ={
        id: PropTypes.string.isRequired,
        name: PropTypes.string,
        value: PropTypes.string,
        labelValue: PropTypes.objectOf(PropTypes.object, PropTypes.string),
        isChecked: PropTypes.bool,
        checked: PropTypes.bool,
        isDisabled: PropTypes.bool,
        type: PropTypes.oneOf(RADIO_TYPES),
        refCallback: PropTypes.func,
        onClick: PropTypes.func,
        onChange: PropTypes.func,
        className: PropTypes.string,
        inputKey: PropTypes.string,
        automationId: PropTypes.string,
        datatlPrivate: PropTypes.bool,
    };

  /** @properties {Default set up} */
    static defaultProps = {
        name: '',
        value: '',
        labelValue: '',
        isChecked: false,
        checked: undefined,
        isDisabled: false,
        type: 'Default',
        refCallback: null,
        onClick: () => {},
        onChange: () => {},
        className: '',
        inputKey: '',
        automationId: 'at-radiobtn-default-id',
        datatlPrivate: false,
    };

    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    /**
     * Function to trigger onClick callback function registered
     * by app components
     */
    handleClick(event) {
        this.props.onClick(event);
    }

    /**
     * Function to trigger onChange callback function registered
     * by app components
     */
    handleChange(event) {
        this.props.onChange(event);
    }


  /**
   * Renders the basic outer skeleton required to render the radio button
   * @return {ReactComponent}
   */
    render() {
        const {
            id,
            type,
            name,
            value,
            refCallback,
            isChecked,
            checked,
            isDisabled,
            className,
            inputKey,
            automationId,
            labelValue,
            datatlPrivate,
        } = this.props;

        const opts = {};
        datatlPrivate ? opts['data-tlPrivate'] = datatlPrivate : '';

        // Entire ReactDOM
        return (
            <div className={cx('radioContainer')} key={inputKey} data-automation-id={`${automationId}-radioContainer`}>
                { checked === undefined ?
                    <input
                        type="radio"
                        id={id}
                        name={name}
                        value={value}
                        ref={refCallback}
                        defaultChecked={isChecked}
                        disabled={isDisabled}
                        onClick={this.handleClick}
                        onChange={this.handleChange}
                        className={cx('radioButton', (`radioBtn${type}`), className)}
                        data-automation-id={`${automationId}-input`}
                    />
                    :
                    <input
                        type="radio"
                        id={id}
                        name={name}
                        value={value}
                        ref={refCallback}
                        defaultChecked={isChecked}
                        checked={checked}
                        disabled={isDisabled}
                        onClick={this.handleClick}
                        onChange={this.handleChange}
                        className={cx('radioButton', (`radioBtn${type}`), className)}
                        data-automation-id={`${automationId}-input`}
                    />
                }
                <label
                    className={cx('radioLabel')}
                    htmlFor={id}
                    data-automation-id={`${automationId}-label`}
                    {...opts}
                >
                    {!isEmpty(labelValue) ? labelValue : value}
                </label>
            </div>
        );
    }
}
export default RadioButton;

