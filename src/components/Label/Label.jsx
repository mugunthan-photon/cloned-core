import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import * as styles from './Label.css';

const cx = classNames.bind(styles);

class Label extends Component {
    static propTypes = {

        className: PropTypes.string,
        children: PropTypes.string,
        automationId: PropTypes.string,
    };

    static defaultProps = {
        className: '',
        children: {},
        automationId: '',
    };

    render() {
        const { className, children, automationId } = this.props;

        return (
            <span data-automation-id={automationId} className={cx('label', (`label-${className}`))}>{children}</span>
        );
    }
}

export default Label;
