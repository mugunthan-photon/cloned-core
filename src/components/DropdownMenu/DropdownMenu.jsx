import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import List from '../List/List';
import Icon from '../Icon/Icon';
import * as styles from './DropdownMenu.css';

const cx = classNames.bind(styles);
export const SUFFIX_STYLE = {
    LINK: 'LINK',
    DEFAULT: 'DEFAULT',
};

const getSuffixStyles = (style) => {
    switch (style) {
        case SUFFIX_STYLE.LINK:
            return cx(styles.suffixLink);
        default:
            return cx(styles.suffixDefault);
    }
};

export default class DropdownMenu extends Component {


    static menuType = PropTypes.shape({
        title: PropTypes.string,
        menuList: PropTypes.array.isRequired,
    }).isRequired;

    static propTypes = {
        datasource: DropdownMenu.menuType,
        showTitle: PropTypes.bool,
        showClose: PropTypes.bool,
        handleMenuClick: PropTypes.func,
        handleCloseClick: PropTypes.func,
        handleSubTitleClick: PropTypes.func,
        customClass: PropTypes.string,
        menuListItemCustomClass: PropTypes.string,
    };

    static defaultProps = {
        direction: 'Vertical',
        showTitle: true,
        showClose: true,
        spacing: 'None',
        datasource: {},
        handleMenuClick: null,
        handleCloseClick: null,
        handleSubTitleClick: null,
        customClass: '',
        menuListItemCustomClass: '',
    };

    constructor(props) {
        super(props);
        this.onClickMenuHandler = this.onClickMenuHandler.bind(this);
        this.onClickCloseHandler = this.onClickCloseHandler.bind(this);
        this.dropdownMenuRenderer = this.dropdownMenuRenderer.bind(this);
        this.onClickSubTitleHandler = this.onClickSubTitleHandler.bind(this);
    }


    onClickMenuHandler(item) {
        this.props.handleMenuClick(item);
    }

    onClickCloseHandler() {
        this.props.handleCloseClick();
    }

    onClickSubTitleHandler() {
        this.props.handleSubTitleClick();
    }

    dropdownMenuRenderer(dataItem) {
        let leafOption = styles.menuRightNavArrow;
        const { menuListItemCustomClass } = this.props;
        if (dataItem.leaf) {
            leafOption = `${styles.menuRightNavArrow} ${styles.hide}`;
        }
        const bindItemClick = this.onClickMenuHandler.bind(this, dataItem);

        // This is weird need. Some suffix items needs to be shown like a link while other just bold text
        const renderSuffix = (suffix) => {
            if (suffix) {
                const { name, style } = suffix;
                const suffixStyle = getSuffixStyles(style);
                return (<span className={suffixStyle}>{name}</span>);
            }
            return null;
        };

        return (
            <button className={cx('menuListItemLink', menuListItemCustomClass)} data-url={dataItem.url} onClick={bindItemClick} data-automation-id="dropdown-item-button">
                <span
                    className={styles.menuListItemName}
                    aria-label={dataItem.name}
                >
                    {dataItem.name} {renderSuffix(dataItem.suffix)}
                </span>
                <i className={leafOption}>
                    <Icon iconType="svg" className={cx('svg-icon')} width="14px" height="14px" viewBox="0 0 18 18" name="arrow-right" />
                </i>
            </button>
        );
    }

    renderSubTitle() {
        return (
            <div className="list-menu">
                <ul>
                    <li className={cx(styles.menuListItemLink, styles.dropdownMenuSubTitle)}>
                        <button data-automation-id="hamburger-back-menu" className={cx(styles.subtitleLink)} onClick={this.onClickSubTitleHandler}>
                            <i data-automation-id="hamburger-back-menu-icon" className={styles.menuLeftNavArrow}>
                                <Icon iconType="svg" className={cx('svg-icon')} width="22px" height="22px" viewBox="0 0 20 20" name="arrow-left" />
                            </i>
                            <span data-automation-id="hamburger-back-menu-title" className={styles.subTitle} aria-label={this.props.datasource.subTitle}>
                                {this.props.datasource.subTitle}
                            </span>
                        </button>
                    </li>
                </ul>
            </div>
        );
    }

    renderTitle(title, showClose) {
        return (
            <div className={styles.dropdownMenuTitle} aria-label={title}>
                <span className={styles.dropdownMenuTitleBlock}>{title}</span>
                {showClose ? this.renderCloseOption() : null}
            </div>
        );
    }

    renderCloseOption() {
        return (<button onClick={this.onClickCloseHandler}><i className={styles.menuWrapperClose}><Icon iconType="svg" className={cx('svg-icon')} width="34px" height="34px" viewBox="0 0 34 34" name="icon-close" /></i></button>);
    }

    render() {
        const { title, menuList, subTitle } = this.props.datasource;
        const { showTitle, showClose, customClass } = this.props;
        const wrapperClass = cx('dropdownMenuWrapper', customClass);
        return (
            <nav className={styles.dropdownMenu}>
                <div className={wrapperClass}>
                    {title && showTitle ? this.renderTitle(title, showClose) : null}
                    {title && subTitle ? this.renderSubTitle() : null}
                    <div className={styles.subMenuList}>
                        <List
                            {...this.props}
                            childRenderer={this.dropdownMenuRenderer}
                            datasource={menuList}
                            itemStyleClass="dropDownMenuListItem"
                        />
                    </div>
                </div>
            </nav>
        );
    }
}
