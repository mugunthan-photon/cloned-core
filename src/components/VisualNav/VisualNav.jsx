import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import List from '../List/List';
import * as styles from './VisualNav.css';

const cx = classNames.bind(styles);

class VisualNav extends Component {
    static defaultProps = {
        datasource: [],
        itemsPerRow: 2,
        direction: '',
        navTheme: '',
        navTitle: '',
        automationId: '',
        themeConfig: {},
        galleryTheme: {},
    };

    static propTypes = {
        datasource: PropTypes.arrayOf(PropTypes.object).isRequired,
        itemsPerRow: PropTypes.number.isRequired,
        direction: PropTypes.string.isRequired,
        navTheme: PropTypes.string,
        navTitle: PropTypes.string,
        automationId: PropTypes.string,
        themeConfig: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        galleryTheme: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    };

    static getThemeConfig(themeConfig) {
        return Object.assign({}, {
            visNavGridTilesClass: styles.gridTiles,
            visNavWrapper: styles.wrapper,
            visNavTitled: styles.titledVisNav,
            visNavDeptTitle: styles.deptTitle,
        }, themeConfig);
    }

    render() {
        const { navTheme, navTitle, datasource, galleryTheme } = this.props;
        const themeConfig = VisualNav.getThemeConfig(this.props.themeConfig);
        let theme = cx(styles.visualNavList, navTitle && themeConfig.visNavTitled);

        if (navTheme) {
            theme = cx(navTheme);
        }

        const title = () => {
            if (navTitle) {
                return (<section className={styles.visualNavTitleWrapper}>
                    <h3 data-automation-id={this.props.automationId} className={styles.visualTitle}>{navTitle}</h3>
                </section>);
            }
            return null;
        };

        const visualNavItemLinkContent = dataItem => (
            <div>
                {dataItem.image && <div className={cx(styles.imgBlock, galleryTheme.imgBlock)}>
                    <img src={dataItem.image} alt={dataItem.title}/>
                </div>}
                <div className={themeConfig.visNavDeptTitle}>
                    <p>{dataItem.title}</p>
                    {dataItem.count && <p>{dataItem.count}</p>}
                </div>
            </div>
        );

        const visualNavItemLinkRenderer = dataItem => (
            <div className={cx(styles.visualNavComponent, galleryTheme.visualNavComponent)}>
                <Link
                    className={styles.deptLink} to={dataItem.links} aria-label={dataItem.title}
                    data-link-href={dataItem.links}>
                    {visualNavItemLinkContent(dataItem)}
                </Link>
            </div>
        );

        const visualNavItemHtmlRenderer = dataItem => (
            <div className={cx(styles.visualNavComponent, galleryTheme.visualNavComponent)}>
                <a
                    className={styles.deptLink} href={dataItem.links} aria-label={dataItem.title}
                    data-link-href={dataItem.links}>
                    {visualNavItemLinkContent(dataItem)}
                </a>
            </div>
        );

        const visualNavItemRenderer = dataItem => (dataItem.isInternalUrl ?
                visualNavItemLinkRenderer(dataItem) : visualNavItemHtmlRenderer(dataItem)
        );

        return (
            <div className={theme}>
                {title()}
                <section>
                    <div className={themeConfig.visNavWrapper}>
                        <List
                            listStyleClass={themeConfig.visNavGridTilesClass}
                            itemStyleClass={cx(styles.gridTilesList,
                                themeConfig.visNavGridTilesList && styles.gridTilesListItem)}
                            datasource={datasource}
                            childRenderer={visualNavItemRenderer}
                            itemsPerRow={this.props.itemsPerRow}
                            direction={this.props.direction}
                            automationId={this.props.automationId}
                        />
                    </div>
                </section>
            </div>
        );
    }
}

export default VisualNav;
