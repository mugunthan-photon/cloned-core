import classNames from 'classnames/bind';
import React, { Component, PropTypes } from 'react';
import * as styles from './Input.css';

const cx = classNames.bind(styles);

class Input extends Component {
    static propTypes = {
        theme: PropTypes.string,
        type: PropTypes.string.isRequired,
        pattern: PropTypes.string,
        inputmode: PropTypes.string,
        id: PropTypes.string,
        name: PropTypes.string,
        placeholder: PropTypes.string,
        size: PropTypes.number,
        onChange: PropTypes.func,
        onCopy: PropTypes.func,
        onCut: PropTypes.func,
        onPaste: PropTypes.func,
        onKeyPress: PropTypes.func,
        onKeyUp: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        readOnly: PropTypes.bool,
        autoFocus: PropTypes.bool,
        required: PropTypes.bool,
        ariaRequired: PropTypes.bool,
        automationId: PropTypes.string,
        refCallBack: PropTypes.func,
        wrapperTheme: PropTypes.string,
        accepts: PropTypes.string,
        errorStatus: PropTypes.func,
        key: PropTypes.string,
        defaultValue: PropTypes.string,
        value: PropTypes.string,
        datatlPrivate: PropTypes.bool,
        disableAutoComplete: PropTypes.bool,
    };

    static defaultProps = {
        theme: '',
        type: 'text',
        pattern: null,
        inputmode: null,
        size: 20,
        ariaRequired: false,
        required: false,
        readOnly: false,
        autoFocus: false,
        id: '',
        name: '',
        placeholder: '',
        onFocus: null,
        onBlur: null,
        automationId: '',
        onChange: () => {},
        onCopy: () => {},
        onCut: () => {},
        onPaste: () => {},
        onKeyPress: () => {},
        onKeyUp: () => {},
        refCallBack: () => {},
        wrapperTheme: '',
        accepts: '',
        errorStatus: () => {},
        key: '',
        defaultValue: '',
        value: null,
        datatlPrivate: false,
        disableAutoComplete: false,
    };

    /* eslint-disable no-useless-constructor */
    constructor() {
        super();
        this.state = {
            isErroneous: false,
        };
    }

    onChange = (event) => {
        if (this.props.onChange && event && event.target) {
            this.props.onChange(event.target.value);
        }
    }

    onKeyPress = (event) => {
        if (this.props.onKeyPress && event) {
            this.props.onKeyPress(event);
        }
    }

    onKeyUp = (event) => {
        // Accepts a Regex for custom validation.
        if (this.props.accepts) {
            if (!this.props.accepts.test(event.target.value)) {
                this.setState({ isErroneous: true });
                this.props.errorStatus(true);
            } else {
                this.setState({ isErroneous: false });
                this.props.errorStatus(false);
            }
        }

        if (this.props.onKeyUp && event) {
            this.props.onKeyUp(event);
        }
    }

    onFocus = (event) => {
        if (this.props.onFocus) {
            this.props.onFocus(event.target.value);
        }
    }

    onBlur = (event) => {
        if (this.props.onBlur) {
            this.props.onBlur(event.target.value);
        }
    }

    render() {
        const { id,
                wrapperTheme,
                theme,
                type,
                pattern,
                inputmode,
                automationId,
                name,
                placeholder,
                size,
                refCallBack,
                value,
                key,
                readOnly,
                autoFocus,
                ariaRequired,
                required,
                defaultValue,
                datatlPrivate,
                disableAutoComplete } = this.props;

        const opts = {};

        opts.readOnly = readOnly;
        opts.autoFocus = autoFocus;
        opts['aria-required'] = ariaRequired;
        opts.required = required;
        opts.value = value;
        datatlPrivate ? opts['data-tlPrivate'] = datatlPrivate : '';

        if (disableAutoComplete) {
            opts.autoComplete = 'off';
            opts.autoCorrect = 'off';
            opts.autoCapitalize = 'off';
            opts.spellCheck = 'off';
        }

        return (
            <span className={cx('input_default', wrapperTheme)}>
                <input
                    id={id}
                    data-automation-id={automationId}
                    className={cx(theme, { haveError: this.state.isErroneous })}
                    type={type}
                    pattern={pattern}
                    inputMode={inputmode}
                    name={name}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    key={key}
                    size={size}
                    onChange={this.onChange}
                    onCopy={this.props.onCopy}
                    onPaste={this.props.onPaste}
                    onCut={this.props.onCut}
                    onKeyPress={this.onKeyPress}
                    onKeyUp={this.onKeyUp}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    ref={refCallBack}
                    {...opts}
                />
            </span>
        );
    }
}

export default Input;
