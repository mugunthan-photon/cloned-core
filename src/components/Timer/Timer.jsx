import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import TimerHelper from './TimerHelper';
import * as styles from './Timer.css';

const cx = classNames.bind(styles);
/**
 * Generic Timer UI Component
 * Timer can be used for any deals which would expire within certain time
 *
 * More code Optimizations will be done for performance improvement as necessary
 */

class Timer extends Component {

    /**
      * Supported React properties
      * @type {Object}
      */
    static propTypes = {

        /**
         * initialTimeRemaining calculated with TimerHelper
         * @type {number} : optional prop
         */
        initialTimeRemaining: PropTypes.number,

        /**
         * A function to call when the countdown completes
         * @type {function} : optional prop
         */
        completeCallback: PropTypes.func,

        /**
         * A function to call each tick.
         * @type {function} : optional prop
         */
        tickCallback: PropTypes.func,

        /**
         * Suffix between Timer Values
         * @type {bool} : optional prop
         */
        suffix: PropTypes.bool,

        /**
         * text between Timer Values
         * @type {bool} : optional prop
         */
        text: PropTypes.oneOf(['on', 'off']),

        /**
         * themeConfig will help in applying a different theme
         * i.e, User can override the default theme by passing
         * themeConfig as props
         * @type {any}
         */
        themeConfig: PropTypes.objectOf([PropTypes.object, PropTypes.array]),


        /**
         * removeZeros when hour reaches 00
         * @type {bool} : optional prop
         */
        removeZeros: PropTypes.bool,


        /**
         * timerTextConfig for timer Text configuration
         * @type {Object} : optional prop
         */
        timerTextConfig: PropTypes.shape({
            h: PropTypes.string,
            m: PropTypes.string,
            s: PropTypes.string,
        }),

        /**
         * colorConfig for timer Color configuration
         * @type {Object} : optional prop
         */
        colorConfig: PropTypes.shape({
            textColor: PropTypes.string,
            suffixColor: PropTypes.string,
            digitBoxbgColor: PropTypes.string,
        }),

        /**
         * endTime for timer in Zone Format
         * @type {Date} : optional prop
         */
        endTime: PropTypes.instanceOf(Date),


        /**
         * digitSplit for timer Numbers to split
         * @type {bool} : optional prop
         */
        digitSplit: PropTypes.bool,

        /**
         * animate for timer to animate digits
         * @type {bool} : optional prop
         */
        animate: PropTypes.bool,
    };

    /** @properties {Default set up} [optonal props set] */
    static defaultProps = {
        initialTimeRemaining: null,
        completeCallback: null,
        tickCallback: null,
        suffix: true,
        text: 'on',
        themeConfig: [],
        removeZeros: false,
        timerTextConfig: {
            h: 'hours',
            m: 'mins',
            s: 'secs',
        },
        endTime: null,
        digitSplit: false,
        colorConfig: {
            textColor: '',
            suffixColor: '',
            digitBoxbgColor: '',
        },
        animate: false,

    };

    /**
     * Gets the theme to use
     * @return {[Object]} [theming classes]
     */
    static getThemeConfig(themeConfig) {
        return Object.assign({}, {
            timerContainerClass: styles.timerContainer,
            timerWrapperClass: styles.timer,
            timerListItemClass: styles.timerListItem,
            timerNumberClass: styles.timerNumber,
            timerTextClass: styles.timerText,
            timerSuffixClass: styles.suffix,
            timerDigitClass: styles.timerDigit,
        }, themeConfig);
    }

    constructor(props) {
        super(props);
        const timeRemaining = props.initialTimeRemaining || TimerHelper.getTimeRemaining(this.props.endTime);

        this.state = {
            timeRemaining: timeRemaining.total > 0 ? timeRemaining.total : 0,
            hours: null,
            minutes: null,
            seconds: null,
            hasFlipped: false,
        };

        this.getFormattedTime = this.getFormattedTime.bind(this);
        this.tick = this.tick.bind(this);
        this.isComponentMounted = false;
        this.getTimer = this.getTimer.bind(this);
        this.themeConfig = Timer.getThemeConfig(props.themeConfig);
        this.timeRemaining = timeRemaining.total;
    }

    componentDidMount() {
        this.isComponentMounted = true;

        if (this.timeRemaining > 0) {
            this.interval = setInterval(() => this.tick(), 1000);
        }
    }

    componentWillUnmount() {
        this.clearIntervals();
    }


    getFormattedTime(milliseconds) {
        return TimerHelper.getFormattedTime(milliseconds);
    }

    /**
     * Flip Animation Template
     */

    getAnimateTemplate(digits, timerDigitClass, digitBoxStyle, prefix, timerNumberClass, timerAnimateClass) {
        // default flip class
        let flipClass = cx('timerClockDigitInner', timerAnimateClass);
        let flipNumberClass = flipClass;
        const { hasFlipped } = this.state; // picking flipped state

        // Prev and Next Html flipping
        let prevNum1 = (<div className={cx('timerPrevNumber', timerNumberClass)}> <span>{digits[0]}</span> </div>);
        let nextNum1 = (<div className={cx('timerNextNumber', timerNumberClass)}> <span>{digits[0] - 1}</span> </div>);

        let nextNum2 = (<div className={cx('timerNextNumber', timerNumberClass)}> <span>{digits[1] - 1}</span> </div>);
        let prevNum2 = (<div className={cx('timerPrevNumber', timerNumberClass)}> <span>{digits[1]}</span> </div>);

        // condn to check and set flip class for 1st digit
        if (this[`secFlipNumber${prefix}1`] > -1 && digits[0] !== this[`secFlipNumber${prefix}1`]) {
            flipNumberClass = cx('timerClockDigitInner', 'timerFlip', timerAnimateClass);
            prevNum1 = (<div className={cx('timerPrevNumber', timerNumberClass)}> <span>{(digits[0] !== 5) ? (digits[0] + 1) : 0}</span></div>);
            nextNum1 = (<div className={cx('timerNextNumber', timerNumberClass)}> <span>{digits[0]}</span> </div>);
            this[`secFlipNumber${prefix}1`] = digits[0];
        }

        // condn to check and set flip class for 2nd digit
        if (hasFlipped && this[`secFlipNumber${prefix}2`] > -1 && digits[1] !== this[`secFlipNumber${prefix}2`]) {
            flipClass = cx('timerClockDigitInner', 'timerFlip', timerAnimateClass);
            nextNum2 = (<div className={cx('timerNextNumber', timerNumberClass)}> <span>{digits[1]}</span> </div>);
            prevNum2 = (<div className={cx('timerPrevNumber', timerNumberClass)}> <span>{(digits[1] !== 9) ? (digits[1] + 1) : 0}</span> </div>);
            this[`secFlipNumber${prefix}2`] = digits[1];
        }


        // setting flip values to digits
        this[`secFlipNumber${prefix}1`] = digits[0];
        this[`secFlipNumber${prefix}2`] = digits[1];

        // final rendered animataHTML
        return (<div>
            <div className={cx('timerClockDigit', timerDigitClass)}>
                <div className={cx(flipNumberClass)} style={digitBoxStyle}>
                    {prevNum1}
                    {nextNum1}
                </div>
            </div>
            <div className={cx('timerClockDigit', timerDigitClass)}>
                <div className={cx(flipClass)} style={digitBoxStyle}>
                    {prevNum2}
                    {nextNum2}
                </div>
            </div>
        </div>);
    }

    getTimer(hours, minutes, seconds) {
        // Extracting classnames from theme config
        const { timerWrapperClass, timerListItemClass,
            timerNumberClass, timerTextClass, timerSuffixClass, timerDigitClass, timerAnimateClass } = this.themeConfig;

        // destrucuring props
        const { textColor, suffixColor, digitBoxbgColor } = this.props.colorConfig;

        // Coloring timer setup.
        const textStyle = textColor ? { color: textColor } : null;
        const suffixStyle = suffixColor ? { color: suffixColor } : null;
        const digitBoxStyle = digitBoxbgColor ? { backgroundColor: digitBoxbgColor } : null;

        // Suffix handling in here
        let suffixHtmlHours = (<div className={timerSuffixClass} style={suffixStyle}> : </div>);
        let suffixHtmlMinutes = (<div className={timerSuffixClass} style={suffixStyle}> : </div>);
        if (!this.props.suffix) {
            suffixHtmlHours = '';
            suffixHtmlMinutes = '';
        }

        let hoursNumberHtml = (<span>{hours}</span>);
        let minutesNumberHtml = (<span>{minutes}</span>);
        let secondsNumberHtml = (<span>{seconds}</span>);

        /** hoursNumberHtml */
        if (this.props.digitSplit) {
            const hoursArr = TimerHelper.getDigitSplit(hours);
            const minutesArr = TimerHelper.getDigitSplit(minutes);
            const secondsArr = TimerHelper.getDigitSplit(seconds);

            // digit split HTML for timer
            hoursNumberHtml = (<span><span className={timerDigitClass} style={digitBoxStyle}>{hoursArr[0]}</span>
                <span className={timerDigitClass} style={digitBoxStyle}>{hoursArr[1]}</span></span>);
            minutesNumberHtml = (<span><span className={timerDigitClass} style={digitBoxStyle}>{minutesArr[0]}</span>
                <span className={timerDigitClass} style={digitBoxStyle}>{minutesArr[1]}</span></span>);
            secondsNumberHtml = (<span><span className={timerDigitClass} style={digitBoxStyle}>{secondsArr[0]}</span>
                <span className={timerDigitClass} style={digitBoxStyle}>{secondsArr[1]}</span></span>);

            // if prop animate is true then we need to do this
            if (this.props.animate) {
                hoursNumberHtml = this.getAnimateTemplate(hoursArr, timerDigitClass, digitBoxStyle, 'H', timerNumberClass, timerAnimateClass);
                minutesNumberHtml = this.getAnimateTemplate(minutesArr, timerDigitClass, digitBoxStyle, 'M', timerNumberClass, timerAnimateClass);
                secondsNumberHtml = this.getAnimateTemplate(secondsArr, timerDigitClass, digitBoxStyle, 'S', timerNumberClass, timerAnimateClass);
            }
        }

        /** Text to show or not starts */
        let hoursTextHtml = (<span className={timerTextClass} style={textStyle}>
            {this.props.timerTextConfig.h} </span>);
        let minsTextHtml = (<span className={timerTextClass} style={textStyle}> {this.props.timerTextConfig.m} </span>);
        let secsTextHtml = (<span className={timerTextClass} style={textStyle}> {this.props.timerTextConfig.s} </span>);

        if (this.props.text === 'off') {
            hoursTextHtml = '';
            minsTextHtml = '';
            secsTextHtml = '';
        }
        /** Text to show or not ends */

        // start of populating hours,mins,secs HTML
        let hoursHtml = (<div className={timerListItemClass}>
            <h4 className={timerNumberClass}>{hoursNumberHtml}
                {hoursTextHtml}
            </h4>
        </div>);
        let minsHtml = (<div className={timerListItemClass}>
            <h4 className={timerNumberClass}>{minutesNumberHtml}
                {minsTextHtml}
            </h4>
        </div>);
        const secsHtml = (<div className={timerListItemClass}>
            <h4 className={timerNumberClass}>{secondsNumberHtml}
                {secsTextHtml}
            </h4>
        </div>);


        // removing zeros
        if (this.props.removeZeros) {
            if (hours === '00') {
                hoursHtml = '';
                suffixHtmlHours = '';
            }

            if (hours === '00' && minutes === '00') {
                minsHtml = '';
                suffixHtmlMinutes = '';
            }
        }

        // end of Populating hours,mins,secs HTML

        return (<div className={timerWrapperClass}>
            {hoursHtml}
            {suffixHtmlHours}
            {minsHtml}
            {suffixHtmlMinutes}
            {secsHtml}
        </div >);
    }

    clearIntervals() {
        clearInterval(this.interval);
    }

    flip() {
        this.setState({
            hasFlipped: false,
        });
    }

    tick() {
        // const remainingTime = this.state.timeRemaining - 1000;
        // We Do this because we need the Timer to display right value when system goes to sleep mode
        const remainingTime = TimerHelper.getTimeRemaining(this.props.endTime);

        if (this.isMountedComponent() && remainingTime.total >= 0) {
            this.setState({ timeRemaining: remainingTime.total, hasFlipped: true });
        } else {
            // clear the interval , can be assigned to a state
            this.clearIntervals();

            /** completeCallBack is called when timer completes */
            if (this.props.completeCallback) {
                this.props.completeCallback();
            }
            return;
        }

        // Reset the timerFlip class from animated digits
        // animate only on request.
        if (this.props.animate) {
            setTimeout(() => this.flip(), 500);
        }

        /**
         * call back execution
         */
        if (this.props.tickCallback) {
            this.props.tickCallback(remainingTime.total);
        }
    }

    isMountedComponent() {
        return this.isComponentMounted;
    }

    render() {
        const milliseconds = this.state.timeRemaining;
        const remainingTime = this.getFormattedTime(milliseconds);

        const { hours, minutes, seconds } = remainingTime;
        return (
            <div className={this.themeConfig.timerContainerClass}>
                {this.getTimer(hours, minutes, seconds)}
            </div>
        );
    }
} // end of Timer

export default Timer;
export { TimerHelper };
