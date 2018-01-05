import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import _take from 'lodash/take';
import _nth from 'lodash/nth';
import _find from 'lodash/find';
import _inRange from 'lodash/inRange';
import List from '../List/List';
import Input from '../Input/Input';
import config from './TypeaheadInput.config';
import Icon from '../Icon/Icon';
import * as styles from './TypeaheadInput.css';

const cx = classNames.bind(styles);

/* istanbul ignore next */
const highlight = (name, query) => {
    const queryTrim = query.trim();
    const tempName = JSON.parse(JSON.stringify(name));
    if (queryTrim !== '') {
        const regex = new RegExp(`(${queryTrim})`, 'gi');
        const replace = '<strong>$1</strong>';
        return tempName.replace(regex, replace);
    }

    return tempName;
};
const prepareUrlPathSearchTerm = (term) => {
    const desired = term.replace(/[^\w\s/+]/gi, '');
    const searchText = desired.replace(/[+]/gi, '-');
    return encodeURIComponent(searchText).replace(/%20/g, '-').replace(/%2F/g, '-');
};
const getPPID = (url) => {
    const match = RegExp('(.*/p/.*/([^/?]+)/?|.*ppId=([^&]*)).*$').exec(url);
    return match && (match[2] || match[3]);
};

const widthRanges = [
    {
        widthStart: 600,
        widthEnd: 1024,
        searchWidthStart: 568,
        searchWidthEnd: 760,
        showFeatureListCount: 2,
    },
    {
        widthStart: 600,
        widthEnd: 1024,
        searchWidthStart: 760,
        searchWidthEnd: 930,
        showFeatureListCount: 3,
    },
    {
        widthStart: 600,
        widthEnd: 1024,
        searchWidthStart: 930,
        searchWidthEnd: 1024,
        showFeatureListCount: 4,
    },
    {
        widthStart: 1024,
        widthEnd: 1441,
        searchWidthStart: 450,
        searchWidthEnd: 904,
        showFeatureListCount: 3,
    },
    {
        widthStart: 1024,
        widthEnd: 1441,
        searchWidthStart: 904,
        searchWidthEnd: 1441,
        showFeatureListCount: 4,
    },
];

class TypeaheadInput extends Component {
    static propTypes = {
        datasource: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        header: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
        placeholder: PropTypes.string,
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        onSelect: PropTypes.func,
        onSubmit: PropTypes.func,
        onMouseDown: PropTypes.func,
        onMouseUp: PropTypes.func,
        onKeyDown: PropTypes.func,
        onReset: PropTypes.func,
        renderCard: PropTypes.func,
        inputText: PropTypes.string,
        isFocused: PropTypes.bool,
        automationId: PropTypes.string,
        type: PropTypes.string,
        showFeatureResult: PropTypes.bool,
        disableAutoComplete: PropTypes.bool,
    };

    static defaultProps = {
        datasource: [],
        data: [],
        header: null,
        placeholder: 'Search products...',
        onChange: null,
        onFocus: null,
        onBlur: null,
        onSelect: null,
        onSubmit: null,
        onMouseDown: null,
        onMouseUp: null,
        onKeyDown: null,
        onReset: null,
        renderCard: null,
        inputText: '',
        isFocused: true,
        automationId: '',
        type: 'search',
        showFeatureResult: false,
        disableAutoComplete: false,
    };

    constructor(props) {
        super(props);

        this.state = {
            productList: [],
            currentSelection: 0,
            currentTerm: '',
            selectedMouseOverItem: '',
            eventAction: false,
        };
    }

    componentDidUpdate(previousProps) {
        if (previousProps.datasource !== this.props.datasource) {
            this.setProductList();
        }
    }

    onSelect = (event) => {
        let currentElemetOrPrevElement = event.target;
        if (!currentElemetOrPrevElement.dataset.currentitem) {
            currentElemetOrPrevElement = event.target.parentElement.getElementsByTagName('span')[0];
        }

        const newValue = currentElemetOrPrevElement.dataset.currentitem;
        const searchResult = {
            term: newValue,
            dept: null,
            position: currentElemetOrPrevElement.dataset.position,
            inputText: this.props.inputText,
        };

        if (newValue.includes(' in ') && !this.props.inputText.includes('in')) {
            if (this.props.header === null) {
                searchResult.term = currentElemetOrPrevElement.dataset.prevdept || this.props.inputText;
                searchResult.dept = newValue;
            } else {
                searchResult.term = newValue;
            }
        }

        if (this.props.onBlur) {
            this.props.onBlur();
        }

        if (this.props.onSelect) {
            this.props.onSelect(searchResult);
        }
    };

    onMouseDown = () => {
        if (this.props.onMouseDown) {
            this.props.onMouseDown();
        }
    };

    onMouseUp = () => {
        if (this.props.onMouseUp) {
            this.props.onMouseUp();
        }
    };

    onFocus = () => {
        this.setState({
            eventAction: false,
        });
        if (this.props.onFocus) {
            this.props.onFocus();
        }
    };

    onBlur = () => {
        this.setState({
            eventAction: false,
        });
        if (this.props.onBlur) {
            this.props.onBlur();
        }
    };

    onSubmit = (event) => {
        const { selectedMouseOverItem } = this.state;
        const inputText = (selectedMouseOverItem && selectedMouseOverItem !== this.props.inputText) ?
            selectedMouseOverItem :
            this.props.inputText;

        if (!inputText) {
            event.preventDefault();
            return;
        }
        const searchResult = {
            term: inputText,
        };

        /* istanbul ignore else */
        if (this.props.onSubmit) {
            this.props.onSubmit(searchResult);
        }
        event.preventDefault();
    };

    onMouseOver = (event) => {
        let currentElemetOrPrevElement = event.target;
        /* istanbul ignore else */
        if (!currentElemetOrPrevElement.dataset.currentitem) {
            currentElemetOrPrevElement = event.target.parentElement.getElementsByTagName('span')[0];
        }
        this.setState({
            selectedMouseOverItem: currentElemetOrPrevElement.innerText,
        });
        const { position, type, index, categoryposition } = currentElemetOrPrevElement.dataset;

        // Not to set state if currentSelection and index are same
        /* istanbul ignore else */
        if (this.state.currentSelection !== index) {
            this.setState({
                currentSelection: parseInt(index, 0),
                eventAction: true,
            });
            this.setProductList(position, type, categoryposition);
        }
    };

    onKeyDown = (event) => {
        const { currentSelection } = this.state;
        const { data, header } = this.props;
        let selection = currentSelection;
        if (!this.state.eventAction && header && selection === 0) {
            selection = -1;
        }

        switch (event.keyCode) {
            case 38: // up
                event.preventDefault();
                // Recent search - initial data will be -1, precedictive search will be 0
                if (selection === -1 || selection === 0) return;
                selection -= 1;
                break;
            case 40: // down
                if (selection === data.length - 1) return;
                event.preventDefault();
                selection += 1;
                break;
            default:
                return;
        }

        // resetting selected mouse overitem
        this.setState({
            selectedMouseOverItem: '',
        });

        const item = _nth(data, selection);
        if (!item) return;
        const { position, type, categoryPosition, value, parentItem } = item;

        this.setState({
            currentSelection: parseInt(selection, 0),
            eventAction: true,
        });
        this.setProductList(position, type, categoryPosition);
        if (this.props.onKeyDown) {
            let inputValue = value;
            if (parentItem) {
                inputValue = `${parentItem}${value}`;
            }
            this.props.onKeyDown(inputValue);
        }
    }

    onChange = (value) => {
        // To reset the selection and make default first one to be selected
        this.setState({
            currentSelection: parseInt(0, 0),
            selectedMouseOverItem: '',
            eventAction: false,
        });
        this.setProductList(); // To make default first one to be selected

        if (this.props.onChange) {
            this.props.onChange(value);
        }
    };

    onReset = () => {
        if (this.props.onReset) {
            this.props.onReset();
        }
    };

    setProductList = (position = 1, type = 'term', categoryposition = 1) => {
        const { datasource, header } = this.props;

        if (position && datasource && datasource.length > 0) {
            if (type === 'term') {
                const i = header ? 0 : 1;
                const category = _nth(datasource, position - i);
                if (category) {
                    this.setState({ productList: category.products || [], currentTerm: category.term });
                }
            } else {
                const category = _nth(datasource, categoryposition - 1);
                const department = _nth(category.depts, position - 1);
                this.setState({
                    productList: department.products,
                    currentTerm: `${category.term} in ${department.name}`,
                });
            }
        }
    }

    renderFeatureList() {
        let width = 0;
        let showFeatureListCount = config.showViewAll;

        if (!__SERVER__) {
            width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            if (width < 600) { // Phone - viewport-sm (width < 600px)
                showFeatureListCount = 0;
            } else {
                const { offsetWidth: searchWidth } = document.getElementById('typeaheadInputContainer') || { offsetWidth: 0 };
                const currentWidthRange = _find(widthRanges, widthrange => (
                     _inRange(width, widthrange.widthStart, widthrange.widthEnd)
                     && _inRange(searchWidth, widthrange.searchWidthStart, widthrange.searchWidthEnd)
                ));
                if (currentWidthRange) {
                    showFeatureListCount = currentWidthRange.showFeatureListCount;
                } else if (searchWidth) {
                    // Desktop XL - viewport-xl (width >= 1440px)
                    showFeatureListCount = 4;
                }
            }
        }
        const productList = _take(this.state.productList, showFeatureListCount);
        productList.forEach((product, index) => {
            const { productUrl } = product;
            if (productUrl && productUrl.indexOf('predictiveDetail') === -1) {
                const predictiveDetail = `product:${this.props.inputText}:${index + 1}:${getPPID(productUrl)}`;
                const conj = (productUrl.indexOf('?') === -1) ? '?' : '&';
                product.productUrl = `${productUrl}${conj}predictiveDetail=${predictiveDetail}`;
            }
        });

        return (
            <div className={cx('listWrapper', 'prodListBlock')}>
                <List
                    direction={'Wrap'}
                    listBodyClass={styles.listBodyClass}
                    itemStyleClass={cx('itemStyleClass', 'col6')}
                    listStyleClass={cx('listStyleClass', 'row')}
                    datasource={productList}
                    childRenderer={this.props.renderCard}
                    itemsPerRow={showFeatureListCount}
                    automationId="product-feature-list"
                    spacing="None"
                />
            </div>
        );
    }

    renderSuggestionBoxItems() {
        const suggestionItems = [];
        let automationId = 'predictive-search-list';
        const { header, inputText, data } = this.props;

        if (data) {
            if (header !== null) {
                suggestionItems.push(header);
                automationId = 'recent-search-list';
            }

            let prevTerm = '';
            suggestionItems.push(data.map((item, index) => {
                const showItem = item.value;
                const dataAutomationId = `${automationId}-${showItem}`;
                let defaultItemSelection = '';
                // Not to have selection if it is recent search (inputText length need to more than one)
                if (this.state.currentSelection === index && (this.state.eventAction || inputText.length > 0)) {
                    defaultItemSelection = cx('typeaheadTermList');
                }

                switch (item.type) {
                    case 'term':
                    default:
                        prevTerm = item.value;
                        return (
                            <li
                                className={defaultItemSelection}
                                onMouseOver={this.onMouseOver}>
                                <button
                                    id="SuggestionItemsBtn"
                                    key={showItem}
                                    data-automation-id={dataAutomationId}
                                    className={styles.typeaheadTermBoxHeader}
                                    onClick={this.onSelect}
                                    type="button"
                                >
                                    <span
                                        className={styles.typeaheadRecentListText}
                                        data-currentitem={item.value}
                                        data-position={item.position}
                                        data-type={item.type}
                                        data-index={index}
                                        data-categoryposition={item.categoryPosition}
                                        dangerouslySetInnerHTML={{ __html: highlight(showItem, inputText) }} // eslint-disable-line react/no-danger
                                    />
                                </button>
                            </li>
                        );

                    case 'dept':
                        return (
                            <li
                                className={defaultItemSelection}
                                onMouseOver={this.onMouseOver}>
                                <button
                                    id="SuggestionDeptBtn"
                                    key={showItem}
                                    data-automation-id={dataAutomationId}
                                    className={styles.typeaheadDeptHeader}
                                    onClick={this.onSelect}
                                    type="button"
                                >
                                    <span
                                        className={styles.typeaheadRecentListDeptText}
                                        data-prevdept={prevTerm}
                                        data-currentitem={item.value}
                                        data-position={item.position}
                                        data-type={item.type}
                                        data-index={index}
                                        data-categoryPosition={item.categoryPosition}
                                        dangerouslySetInnerHTML={{ __html: highlight(showItem, inputText) }} // eslint-disable-line react/no-danger
                                    />
                                </button>
                            </li>
                        );
                }
            }));
            return suggestionItems;
        }
        return null;
    }

    renderFeatureResult() {
        const { productList, currentTerm } = this.state;
        const { header } = this.props;
        if (this.props.showFeatureResult && productList && productList.length > 0 && !header) {
            const pathTerm = prepareUrlPathSearchTerm(currentTerm);
            const searchUrl = `/s/${pathTerm}?Ntt=${currentTerm}`;
            const showViewAll = productList.length > config.showViewAll;
            return (
                <div className={cx('searchFeatureBlock')}>
                    <h4 className={cx('searchFeatureTitle')}>Featured Results for</h4>
                    <h3 className={cx('searchFeatureProdTitle')}>{currentTerm} {showViewAll && <a href={searchUrl} className={cx('searchViewAll')} automationId="Search-view-all">View All Results</a>}</h3>
                    {/* Product Card Block */}
                    {this.renderFeatureList()}
                    {/* Product Card Block Ends */}
                </div>
            );
        }

        return '';
    }

    renderSuggestionBox() {
        if (this.props.isFocused && (this.props.datasource && this.props.datasource.length > 0)) {
            return (
                <div className={cx('searchSuggestionFeatureContainer')}>
                    <div className={cx('searchSuggestionFeatureBlock')}>
                        {/* Search Suggestion Typeahead Block */}
                        <div className={cx('searchSuggestionBlock')}>
                            {/* Place Holder for Typeahead */}
                            <div id="TypeaheadSuggestBox" className={styles.typeaheadSuggestionBox}>
                                <ul>
                                    {this.renderSuggestionBoxItems()}
                                </ul>
                            </div>
                            {/* Place Holder For Typeahdead Ends */}
                        </div>
                        {/* Search Suggestion Typeahead Block Ends */}
                        {/* Feature Results For Block */}
                        {this.renderFeatureResult(1)}
                        {/* Feature Results For Block Ends */}
                    </div>
                </div>
            );
        }
        return '';
    }

    renderInput() {
        const showValue = this.props.inputText;

        return (
            <form action="/s/search" className={styles.typeaheadFocusInputContent} onSubmit={this.onSubmit}>
                <Input
                    name="Ntt"
                    type={this.props.type}
                    automationId={this.props.automationId}
                    theme={styles.inputBox}
                    value={showValue}
                    placeholder={this.props.placeholder}
                    onChange={this.onChange}
                    disableAutoComplete={this.props.disableAutoComplete}
                />
            </form>
        );
    }

    renderResetIcon() {
        if ((this.props.inputText.length > 0) && this.props.isFocused) {
            return (
                <button
                    id="TypeaheadInputRestBtn" className={styles.resetIconBlock} onClick={this.onReset}
                    type="button">
                    <Icon iconType="svg" width="25" height="25" viewBox="0 0 25 25" name={config.svgResetIconName} />
                </button>
            );
        }
        return '';
    }

    render() {
        const typeaheadInputField = this.props.isFocused ? cx('typeaheadInputFieldFocused', 'inputFieldBlock') : cx('typeaheadInputFieldBlurred', 'inputFieldBlock');

        return (
            // eslint-disable-next-line
            <div
                className={styles.typeaheadInputContainer}
                id="typeaheadInputContainer"
                onMouseDown={this.onMouseDown}
                onBlur={this.onBlur}
                onMouseUp={this.onMouseUp}
                onFocus={this.onFocus}
                onKeyDown={this.onKeyDown}>
                <div className={typeaheadInputField}>
                    <button title="search" onClick={this.onSubmit} type="button" className={styles.searchIconBlock}>
                        <Icon iconType="svg" width="40px" height="40px" viewBox="-10 -10 40 40" pathClassName={styles.headerSearchIcon} name={config.svgSearchIconName} />
                    </button>
                    {this.renderInput()}
                    {this.renderResetIcon()}
                </div>
                {this.renderSuggestionBox()}
            </div>
        );
    }
}

export default TypeaheadInput;
