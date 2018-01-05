import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import * as styles from './Loader.css';

const cx = classNames.bind(styles);

class Loader extends Component {
  /**
   * Renders the basic outer skeleton required to render the Loader
   * @return {ReactComponent}
   */
    static propTypes = {
        keepOverlay: PropTypes.bool.isRequired,
        loaderClass: PropTypes.string,
        /**
         * Unique name for referencing dom element in automation testing
         * @type {String}
         */

        automationId: PropTypes.string,
    };

    static defaultProps = {
        keepOverlay: false,
        automationId: '',
        loaderClass: '',
    };

    render() {
        const { keepOverlay, automationId, loaderClass } = this.props;

        // Entire ReactDOM
        return (
            <div className={cx('loading-event', loaderClass, keepOverlay ? 'loading-event-overlay' : null)}>
                <div className={styles.loadingImage}>
                    <div data-automation-id={automationId} className={styles.loadingCircle} />
                </div>
            </div>
        );
    }
}

export default Loader;
