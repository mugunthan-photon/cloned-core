import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import * as styles from './Rating.css';

const bx = classNames.bind(styles);
const defaultThemeConfig = {
    starClass: bx('starValue'),
};

class Rating extends Component {
    static propTypes = {
        total: PropTypes.number,
        rating: PropTypes.number,
        /* Need to remove once the other implemented code was cleaned */
        size: PropTypes.number,
        color: PropTypes.string,
        bgcolor: PropTypes.string,
        step: PropTypes.number,
        space: PropTypes.number,
        shape: PropTypes.string,
        /**
         * Unique name for referencing dom element in automation testing
         * @type {String}
         */
        /**
         * For custom styling
         * @type {String}
         */
        svgClassName: PropTypes.string,
        theme: PropTypes.string,
        /* Need to remove once the other implemented code was cleaned Ends */
        automationId: PropTypes.string,
        starColor: PropTypes.string,
        starSize: PropTypes.string,
        themeConfig: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    };

    static defaultProps = {
        total: 5,
        rating: 2,
        /* Need to remove once the other implemented code was cleaned */
        size: 50,
        color: '#CC0000',
        bgcolor: '#C6C6C6',
        step: 1,
        shape: 'star',
        space: 0,
        svgClassName: '',
        theme: '',
        /* Need to remove once the other implemented code was cleaned Ends */
        automationId: '',
        starColor: '',
        starSize: '',
        themeConfig: {},
    };

    /* Need to remove once the other implemented code was cleaned Ends */
    static circlePath(size) {
        const cx = size / 2;
        const cy = size / 2;
        const r = (size / 2) - 2;
        return (`M ${cx} ${cy} m -${r}, 0 a ${r},${r} 0 1,0 ${(r * 2)},0 a ${r},${r} 0 1,0 -${(r * 2)},0`);
    }

    constructor(props) {
        super(props);
        this.themeConfig = this.getThemeConfig();
    }

    getSvg() {
        const elems = [];
        if (this.props.rating >= 0) {
            for (let i = 0; i < this.props.total; i += this.props.step) {
                const attrs = {};
                attrs.transform = `translate(${i * (this.props.size + this.props.space)}, 0)`;
                attrs.fill = (i + this.props.step <= this.props.rating) ? this.props.color : this.props.bgcolor;
                if (this.props.shape === 'star') {
                    elems.push(
                        <path
                            {...attrs}
                            d="m0,18.1l19.1,0l5.9,-18.1l5.9,18.1l19.1,0l-15.4,11.2l5.9,18.1l-15.4,-11.2l-15.4,11.2l5.9,-18.1l-15.4,-11.2l0,0z"
                            key={i}
                        />,
                    );
                }
                if (this.props.shape === 'circle') {
                    const path = Rating.circlePath(this.props.size);
                    elems.push(
                        <path
                            {...attrs}
                            d={path}
                            key={i}
                        />,

                    );
                }
            }
        }

        const elemStyles = {
            width: `${((this.props.size * this.props.total) + this.props.space)}px`,
            height: `${this.props.size}px`,
        };

        return (
            <svg
                style={elemStyles}
                className={this.props.svgClassName}
                viewBox={`0 0 ${elems.length} 50`}
                preserveAspectRatio="xMinYMin meet"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g>
                    {elems}
                </g>
            </svg>
        );
    }

    getThemeConfig() {
        return {
            ...defaultThemeConfig,
            ...this.props.themeConfig,
        };
    }
    /* Need to remove once the other implemented code was cleaned Ends */

    getIcon() {
        const elems = [];
        if (this.props.rating >= 0) {
            for (let i = 0; i < this.props.total; i += this.props.step) {
                if (this.props.shape === 'star') {
                    elems.push(
                        <span className={this.themeConfig.starClass}>&#9733;</span>,
                    );
                }
                if (this.props.shape === 'circle') {
                    elems.push(
                        <span className={this.themeConfig.starClass}>&#9679;</span>,
                    );
                }
            }
        }
        const elmStyles = {
            width: `${((this.props.rating / this.props.total) * 100)}%`,
        };
        return (
            /* New Start rating for Decimals */
            <div className={bx('starIconRatingBlock')} data-automation-id={this.props.automationId}>
                <div className={bx('starIcon', this.props.starSize)}>
                    <div className={bx('starIconRating')}>
                        {elems}
                    </div>
                    <div className={bx('starIconRatingValue', this.props.starColor)} style={elmStyles}>
                        {elems}
                    </div>
                </div>
            </div>
            /* New Start rating for Decimals Ends */
        );
    }

    render() {
        const { automationId, theme } = this.props;
        return (
            <div className={bx(theme)}> {/* Need to remove once the other implemented code was cleaned */}
                {/* Need to remove once the other implemented code was cleaned */}
                <span className={bx('wrapper', 'starSvgRating')} data-automation-id={automationId}>
                    {this.getSvg()}
                </span>
                {/* Need to remove once the other implemented code was cleaned Ends */}
                {this.getIcon()}
            </div> /* Need to remove once the other implemented code was cleaned */
        );
    }
}

export default Rating;
