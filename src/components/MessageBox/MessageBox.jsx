import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import noop from 'lodash/noop';
import Icon from '../Icon/Icon';
import { LoadSVG } from '../../helpers';
import camSprite from '../../assets/sprite.svg';
import * as styles from './MessageBox.css';


const cx = classNames.bind(styles);

const BOX_TYPES = [
    'success',
    'error',
    'warning',
    'information',
];

const BOX_LEVEL = [
    'page',
    'section',
    'inline',
];

class MessageBox extends Component {

    static propTypes = {
        id: PropTypes.string,
        type: PropTypes.oneOf(BOX_TYPES),
        level: PropTypes.oneOf(BOX_LEVEL),
        showMessage: PropTypes.bool.isRequired,
        title: PropTypes.string,
        onClose: PropTypes.func,
        children: PropTypes.element,
        className: PropTypes.string,
        hasClose: PropTypes.bool,
        automationId: PropTypes.string,
        theme: PropTypes.string,
    };

    static defaultProps = {
        id: '',
        type: 'information',
        level: 'page',
        showMessage: true,
        title: null,
        children: null,
        className: '',
        hasClose: true,
        onClose: noop,
        automationId: 'at-messagebox-default-id',
        theme: '',
    };

    constructor(props) {
        super();
        if (props.hasClose === true) {
            this.closeBox = this.closeBox.bind(this);
        }
        this.rawMarkup = this.rawMarkup.bind(this);
    }
    /**
     * Function to change title prop to change to an object
     * Adding this feature beacuse in messagebox component we have link to be shown
     */
    rawMarkup() {
        const rawMarkup = this.props.title;
        return { __html: rawMarkup };
    }

    /**
     * Function to trigger onClose callback function registered
     * by app components
     */
    closeBox() {
        this.props.onClose();
    }


  /**
   * Renders the basic outer skeleton required to render the message box
   * @return {ReactComponent}
   */
    render() {
        const { theme, id, type, level, showMessage, title, children, className, hasClose, automationId } = this.props;
        const typeWidth = level === 'inline' ? '25px' : '40px';
        return (
            <div>
                {showMessage ?
                    <div id={id} className={cx('messageBox', (`${type}Message`), type, theme)} data-automation-id={`${automationId}-messagebox`}>
                        <LoadSVG svgPaths={[camSprite]} />
                        <div className={cx('messageBoxBlock', (`${level}Level`), className)} data-automation-id={`${automationId}-msgbox-block`}>
                            <div className={cx('sm11', 'md11', 'lg11', 'xl11', 'messageGrid')}>
                                <div className={cx('messageIcon')}>
                                    <Icon iconType="svg" width={typeWidth} height="40px" viewBox="0 0 40 40" name={type} automationId={`${automationId}-${type}-icon`}/>
                                </div>
                                <div className={cx('messageContent')} data-automation-id={`${automationId}-msgbox-content`}>
                                    {(title && (typeof title === 'string')) ?
                                        <p className={cx('messageTitle')} data-automation-id={`${automationId}-title`} dangerouslySetInnerHTML={this.rawMarkup()} /> : ''}
                                    {(title && (typeof title !== 'string')) ?
                                        <p className={cx('messageTitle')} data-automation-id={`${automationId}-title`}>{title}</p> : ''}
                                    {children ?
                                        <div className={cx('messageText')} data-automation-id={`${automationId}-messageTxt`}>
                                            {children}
                                        </div> : ''}
                                </div>
                            </div>
                            {hasClose ?
                                <div className={cx('sm1', 'md1', 'lg1', 'xl1')}>
                                    <span className={cx('close')}>
                                        <button
                                            onClick={this.closeBox}
                                            data-automation-id={`${automationId}-msgbox-close-btn`}>
                                            <Icon
                                                iconType="svg"
                                                width="25px"
                                                height="25px"
                                                viewBox="0 0 25 25"
                                                name="close"
                                                automationId={`${automationId}-close-icon`}/>
                                        </button>
                                    </span>
                                </div> : ''
                            }
                        </div>
                    </div> : ''
                }
            </div>
        );
    }
}

export default MessageBox;
