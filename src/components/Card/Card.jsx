import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import * as styles from './Card.css';

const cx = classNames.bind(styles);

class Card extends Component {
    static propTypes = {

        children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        /**
         * Unique name for referencing dom element in automation testing
         * @type {String}
         */

        automationId: PropTypes.string,

        /**
         * Custom class for card
         * @type {String}
         */

        cardClass: PropTypes.string,
    };

    static defaultProps = {

        children: [],
        automationId: '',
        cardClass: '',
    };

    render() {
        const { automationId, cardClass } = this.props;

        return (
            <div className={cx('cardWrapper', cardClass)} data-automation-id={automationId}>
                {this.props.children}
            </div>
        );
    }
}

export default Card;
