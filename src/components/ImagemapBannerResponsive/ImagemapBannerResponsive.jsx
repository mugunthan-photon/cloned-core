import React, { Component, PropTypes } from 'react';
import FastClick from 'react-fastclick-alt';
import classNames from 'classnames/bind';
import { browserHistory } from 'react-router';
import * as styles from './ImagemapBannerResponsive.css';

const cx = classNames.bind(styles);

/**
 * This component to standardize the styling and html structure of any advertisement/promotion image banner with area map.
 * It is responsive. The co-ordinates for area will be recalculated based on the image width.
 *
 */

class ImagemapBannerResponsive extends Component {

    /**
     * Supported React properties
     * @type {Object}
     */
    static propTypes = {

        /**
         * Unique name for referencing dom element in automation testing
         * @type {String}
         */
        automationId: PropTypes.string,

        /**
         * source path of the banner image
         * @type {string}
         */
        imageUrl: PropTypes.string.isRequired,

        /**
         * an array containig details to feed multiple HTML area attribute
         * @type {array}
         */
        imagemapArea: PropTypes.oneOfType([PropTypes.array]).isRequired,

        /**
         * alternative text for the banner image
         * @type {string}
         */
        imageAltText: PropTypes.string,

        softRoute: PropTypes.bool,
        onImageLoad: PropTypes.func,
        onImageError: PropTypes.func,
        theme: PropTypes.string,

    };

    static defaultProps = {
        automationId: '',
        imageUrl: '',
        imagemapArea: [],
        imageAltText: 'JCP image',
        softRoute: false,
        onImageLoad: () => {},
        onImageError: () => {},
        theme: '',
    };

    /* istanbul ignore next */
    constructor(props) {
        super(props);
        this.goToPage = this.goToPage.bind(this);
        this.handleImageLoaded = this.handleImageLoaded.bind(this);
    }

    componentDidMount() {
        /* istanbul ignore next */
        window.addEventListener('resize', () => {
            this.handleImageLoaded();
        }, false);
    }

    componentWillUnmount() {
        /* istanbul ignore next */
        window.removeEventListener('resize', () => {
            this.handleImageLoaded();
        }, false);
    }

    goToPage(e) {
        e.preventDefault();
        const analyticsTrackCode = e.target.dataset.analyticstag;
        let softRouteURL = e.target.dataset.softlink;
        const matchForCmRe = /cm_re/.test(softRouteURL.toLowerCase());
        /* istanbul ignore next */
        if (!matchForCmRe && analyticsTrackCode) {
            const match = /.+\?.*/.test(softRouteURL);
            if (match) {
                softRouteURL += `&${analyticsTrackCode}`;
            } else {
                softRouteURL += `?${analyticsTrackCode}`;
            }
        }

        if (this.props.softRoute) {
            if (e.target.dataset.leaf === 'true' || e.target.dataset.leaf === true) {
                window.location.href = softRouteURL;
            } else {
                browserHistory.push(softRouteURL);
            }
        } else {
            window.location.href = softRouteURL;
        }
    }


    createMapArea(imagemapArea) {
        /* eslint-disable jsx-a11y/no-static-element-interactions */
        return imagemapArea.map(args =>
            <area
                key={args.coords.split(',').join('')}
                shape={args.shape}
                coords={args.coords}
                data-softLink={args.link}
                data-leaf={args.leaf}
                data-analyticsTag={args.analyticsTag}
                onClick={this.goToPage}
                alt={args.alt}
                target={args.target}
                href={args.link}
            />,
        );
    }


    handleImageLoaded() {
        const naturalWidth = this.image.naturalWidth;
        const naturalHeight = this.image.naturalHeight;
        const areas = this.imagemap.children;
        const areaLength = areas.length;
        const imageWrapper = this.imageWrapper;
        const coords = [];
        const scaleWidth = imageWrapper.clientWidth / naturalWidth;
        const scaleHeight = imageWrapper.clientHeight / naturalHeight;
        let iteratorX = 0;
        let iteratorY = 0;
        let selScaeUnit = 0;

        for (iteratorX = 0; iteratorX < areaLength; iteratorX += 1) {
            /* getting the actual map area co-ordinates */
            coords[iteratorX] = this.props.imagemapArea[iteratorX].coords.split(',');

            for (iteratorY = 0; iteratorY < coords[iteratorX].length; iteratorY += 1) {
                selScaeUnit = iteratorY % 2 ? scaleHeight : scaleWidth;
                /* multiplying the actual map area co-ordinates with scaleUnit */
                coords[iteratorX][iteratorY] *= selScaeUnit;
            }
            /* updating the DOM */
            areas[iteratorX].coords = coords[iteratorX].join(',');
        }
    }

    render() {
        const { automationId, onImageLoad, onImageError, theme } = this.props;
        const uniqueId = `${Date.now()}-${Math.floor((Math.random() * 10000) + 1)}`;

        return (
            <FastClick>
                <div
                    className={cx('imagemapBannerResponsive', theme)}
                    ref={(wrapper) => {
                        this.imageWrapper = wrapper;
                    }}
                    data-automation-id={automationId}>

                    <img
                        src={this.props.imageUrl}
                        alt={this.props.imageAltText}
                        useMap={`#${uniqueId}`}
                        onLoad={() => { this.handleImageLoaded(); onImageLoad(); }} //eslint-disable-line
                        onError={onImageError}
                        ref={(img) => {
                            this.image = img;
                        }}
                    />
                    <map
                        name={`${uniqueId}`} ref={(map) => {
                            this.imagemap = map;
                        }}
                    >
                        {this.createMapArea(this.props.imagemapArea)}
                    </map>
                </div>
            </FastClick>
        );
    }
}

export default ImagemapBannerResponsive;
