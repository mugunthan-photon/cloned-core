import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import * as styles from './ModalBox.css';
import Icon from '../Icon/Icon';
import ScrollLockHOCFactory from '../../hoc/ScrollLockHOC/ScrollLockHOC';

const cx = classNames.bind(styles);
/**
 * ModalBox component to display Modal based on HTML supplied by user
 * <ModalBox showModal={modalOpen} onClose={close} >
 *   <div>
 *      Modal
 *   </div>
 * </ModalBox>
 */

export class ModalBox extends Component {

    /*
     * Supported PropTypes for Modal components
     * @type {Object}
     */
    static propTypes = {

        /**
         * Required field to close or open Modal
         * @type {[type]}
         * showModal: PropTypes.bool,
         */
        showModal: PropTypes.bool.isRequired,

        /**
         * On close call back event for Modal
         * @type {[type]}
         * onClose: PropTypes.func,
         */
        onClose: PropTypes.func.isRequired,

        /**
         * HTML wrapped inside Modal html
         * @type {[type]}
         */
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node,
        ]),

        /**
         * Custom Class Name for modal Wrapper
         * @type {[type]}
         */
        modalTheme: PropTypes.string,

        /**
         * Custom Class Name for modal content
         * @type {[type]}
         */
        modalContentTheme: PropTypes.string,

        /**
         * Custom Class Name for modal overlay
         * @type {[type]}
         */
        modalOverlayTheme: PropTypes.string,

        /**
         * Custom Class Name for modal overlay
         * @type {[type]}
         */
        modalBlockTheme: PropTypes.string,

        /**
         * Custom Class Name for modal overlay
         * @type {[type]}
         */
        modalTitleTheme: PropTypes.string,
        /**
         * Switch to display default header
         * @type {[type]}
         */
        defaultHeader: PropTypes.bool,

        /**
         * Unique name for referencing dom element in automation testing
         * @type {String}
         */
        automationId: PropTypes.string,

        /** Title and Subtitle if needed * */
        title: PropTypes.string,
        subTitle: PropTypes.string,

        /**
         * Switch to display close button
        */
        defaultCloseBtn: PropTypes.bool,
    };

    /**
     * Initializing  onclose props
     */
    static defaultProps = {
        modalTheme: '',
        children: '',
        defaultHeader: false,
        automationId: '',
        title: '',
        subTitle: '',
        defaultCloseBtn: true,
        modalContentTheme: '',
        modalOverlayTheme: '',
        modalBlockTheme: '',
        modalTitleTheme: '',
    };

    /**
     * Function to trigger onclose callback function registered
     * by app components
     */
    closeModal(event) {
        event.preventDefault();
        event.stopPropagation();
        this.props.onClose();
    }

    render() {
        const {
          showModal,
          children,
          modalTheme,
          defaultHeader,
          automationId,
          title,
          subTitle,
          modalContentTheme,
          defaultCloseBtn,
          modalOverlayTheme,
          modalBlockTheme,
          modalTitleTheme,
        } = this.props;

        if (showModal) {
            return (
                <div className={cx('modalOverlay', modalOverlayTheme)}>
                    <div className={cx('modalWrapper', modalTheme)}>
                        {defaultCloseBtn ? <button
                            className={styles.crossBar}
                            onClick={e => this.closeModal(e)}
                            data-automation-id="modal-button"
                        >
                            <Icon
                                type="button" iconType="svg" width="24px" height="24px" viewBox="0 0 25 25"
                                name="icon-close" automationId={`modal-icon-${automationId}`}
                            />
                        </button> : ''}
                        <div className={cx('modalBlock', modalBlockTheme)}>
                            {defaultHeader ?
                                <div className={styles.modalHeader}>
                                    <h2 className={cx('modalTitle', modalTitleTheme)}>{title}</h2>
                                    <h4 className={styles.modalSubTitle}>{subTitle}</h4>
                                </div> : ''}

                            <div className={cx('modalContent', modalContentTheme)} data-automation-id="modal-content">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    }
}

export default ScrollLockHOCFactory('showModal')(ModalBox);
