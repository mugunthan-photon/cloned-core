import React, { Component, PropTypes } from 'react';
import ReactSwipe from 'react-swipe';
import classNames from 'classnames/bind';
import bindAll from 'lodash/bindAll';
import Icon from '../Icon/Icon';
import styles from './Carousel.css';

const cx = classNames.bind(styles);

const SwipeDirections = {
    Left: 0,
    Right: 1,
    Top: 2,
    Bottom: 3,
};

class Carousel extends Component {

    /**
     * Supported React properties
     * @type {Object}
     */

    static propTypes = {
        /**
         * Required field to pass data array to create carousel slides.
         */
        carouselData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),

        /**
         * Renderer method that returns React component or any other HTML
         */
        carouselItemRenderer: PropTypes.func.isRequired,

        /**
         * Minimum displace ment required in pixels to trigger the touch event actions.
         */
        // minimumSliderTouchThreshold: PropTypes.number,

        /**
         * Unique name for referencing dom element in automation testing
         * @type {String}
         */
        automationId: PropTypes.string,

        /**
         * Callback function when slide occurs
         * @type {Function}
         */
        slideCallback: PropTypes.func,

         /**
         * themeConfig will help in applying a different theme
         * i.e, User can override the default theme by passing
         * themeConfig as props
         * @type {boolean}
         */
        themeConfig: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,

        displayPagination: PropTypes.bool,
        rewindOnChange: PropTypes.bool,

        /**
         * Options for react-swipe.
         * https://github.com/voronianski/swipe-js-iso#config-options
         */
        swipeOptions: PropTypes.shape({
            startSlide: PropTypes.number,
            speed: PropTypes.number,
            auto: PropTypes.number,
            continuous: PropTypes.bool,
            disableScroll: PropTypes.bool,
            stopPropagation: PropTypes.bool,
            swiping: PropTypes.func,
            // this function will be overriden so pass
            // callback in Carousel prop.
            callback: PropTypes.func,
            transitionEnd: PropTypes.func,
        }),
        swipeStyles: PropTypes.oneOfType([PropTypes.object]),
    };

    static defaultProps = {
        carouselData: {},
        automationId: '',
        themeConfig: [],
        repeat: true,
        bottomLeftSlot: null,
        bottomRightSlot: null,
        rewindOnChange: false,
        slideCallback: null,
        carouselItemRenderer: () => {},
        displayPagination: true,
        swipeOptions: {
            continuous: true,
        },
        swipeStyles: {
            container: {
                overflow: 'hidden',
                visibility: 'visible',
                position: 'relative',
            },

            wrapper: {
                overflow: 'hidden',
                position: 'relative',
            },

            child: {
                float: 'left',
                position: 'relative',
                transitionProperty: 'transform',
            },
        },
    }

    /**
     * Gets the theme to use
     * @return {[Object]} [theming classes]
     */
    static getThemeConfig(themeConfig) {
        return Object.assign({}, {
            carouselSelected: styles.selected,
            carouselBullets: styles.carouselBullets,
            carouselBlock: styles.carouselBlock,
            bullet: styles.bullet,
            carouselContainer: styles.carouselContainer,
            nextWrapper: styles.nextWrapper,
            previousWrapper: styles.previousWrapper,
            next: styles.next,
            previous: styles.previous,
            slideClass: styles.slide,
        }, themeConfig);
    }

    /* istanbul ignore next */
    constructor(props) {
        super(props);

        this.state = {
            activeSlideIndex: 0,
            touchPointDisplacement: {
                x: 0,
                y: 0,
            },
        };
        this.themeConfig = Carousel.getThemeConfig(props.themeConfig);
        this.touchPointStartPosition = null;
        this.touchPointCurrentPosition = null;

        bindAll(this, [
            'itemRenderer',
            'canSlideNext',
            'canSlidePrevious',
            'slideCallback',
            'slidePrevious',
            'slideNext',
            'slide',
        ]);

        this.props.swipeOptions.callback = this.slideCallback;
    }

    componentWillMount() {
        // give 100% width on client.
        if (typeof window !== 'undefined') {
            this.props.swipeStyles.container.width = '100%';
        }
    }

    componentWillReceiveProps(nextProps) {
        const { rewindOnChange, carouselData } = this.props;
        if (rewindOnChange && nextProps.carouselData !== carouselData) {
            this.slide(0);
        }
    }

    canSlideNext() {
        return this.props.swipeOptions.continuous || this.state.activeSlideIndex < (this.props.carouselData.length - 1);
    }

    canSlidePrevious() {
        return this.props.swipeOptions.continuous || this.state.activeSlideIndex !== 0;
    }

    slideCallback(idx) {
        this.setState({
            activeSlideIndex: idx,
        });

        this.props.slideCallback && this.props.slideCallback(idx);
    }

    slidePrevious() {
        this.reactSwipe && this.reactSwipe.prev();
    }

    slideNext() {
        this.reactSwipe && this.reactSwipe.next();
    }

    slide(idx) {
        this.reactSwipe && this.reactSwipe.slide(idx);
    }

    itemRenderer(...args) {
        return (
            <div className={cx('slide')}>
                {this.props.carouselItemRenderer.apply(null, args)}
            </div>
        );
    }

    renderSliderControls() {
        return this.props.carouselData.map((carouselDataItem, index) => {
            const controlStyleClasses = cx({
                [this.themeConfig.bullet]: !carouselDataItem.icon,
                [this.themeConfig.carouselSelected]: this.state.activeSlideIndex === index,
            });

            return (
                <button
                    key={carouselDataItem.key}
                    className={controlStyleClasses}
                    data-automation-id={`carousel-pgn-${index}`}
                    onClick={this.slide.bind(this, index)} // eslint-disable-line react/jsx-no-bind
                >
                    {carouselDataItem.icon ? (
                        <Icon
                            iconType="svg"
                            className={cx('svg-icon')}
                            name={carouselDataItem.icon}
                            width="24px"
                            height="24px"
                            viewBox="0 4 48 48"
                        />
                    ) : null }
                </button>
            );
        });
    }

    renderNextButton() {
        return (
            this.canSlideNext() ? (
                <div className={this.themeConfig.nextWrapper}>
                    <button onClick={this.slideNext} data-automation-id="carousel-next">
                        <a className={cx(this.themeConfig.next)} aria-label="next slide">
                            <Icon
                                iconType="svg"
                                className={cx('svg-icon')}
                                width="30px"
                                height="30px"
                                name="icon-chevron-right"
                            />
                        </a>
                    </button>
                </div>
            ) : null
        );
    }

    renderPreviousButton() {
        return (
            this.canSlidePrevious() ? (
                <div className={this.themeConfig.previousWrapper}>
                    <button onClick={this.slidePrevious} data-automation-id="carousel-prev">
                        <a className={cx(this.themeConfig.previous)} aria-label="previous slide">
                            <Icon
                                iconType="svg"
                                className={cx('svg-icon')}
                                width="30px"
                                height="30px"
                                name="icon-chevron-left"
                            />
                        </a>
                    </button>
                </div>
            ) : null
        );
    }

    render() {
        const sliderControls = this.renderSliderControls();
        return (
            <section className={styles.carousel} data-automation-id={this.props.automationId}>
                <div className={this.themeConfig.carouselBlock}>
                    <div
                        data-automation-id="main"
                        className={this.themeConfig.carouselContainer}
                        ref={(carouselContainer) => {
                            this.carouselContainer = carouselContainer;
                        }}
                    >
                        <ReactSwipe
                            ref={(reactSwipe) => { this.reactSwipe = reactSwipe; }}
                            swipeOptions={this.props.swipeOptions}
                            className={cx('swipe-container')}
                            style={this.props.swipeStyles}
                        >
                            {this.props.carouselData.map(this.itemRenderer)}
                        </ReactSwipe>
                    </div>
                    {this.renderNextButton()}
                    {this.renderPreviousButton()}
                </div>
                {this.props.displayPagination && this.props.carouselData.length > 1 ?
                    <div className={cx('bulletContainer')}>
                        <div className={cx(this.themeConfig.carouselBullets)} data-automation-id="pagination">
                            {sliderControls}
                        </div>
                    </div>
                    : null
                }
            </section>
        );
    }
}


export default Carousel;
export { SwipeDirections };
