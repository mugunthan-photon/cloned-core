import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import * as styles from './Image.css';

const cx = classNames.bind(styles);
class Image extends Component {
    static propTypes = {
        alt: PropTypes.string,
        src: PropTypes.string,

        /**
         * Ratio of the image height to width
         *
         * http://aspiringwebdev.com/stop-your-web-pages-from-jumping-around-while-images-load/
         *
         * The page jumps occur because the browser does not know the width and height of the images in advance.
         * On a responsive site, the image could be a different height and width depending on the screen size.
         * We may, however, know the ratio of the image’s height to its width. That will not change for a given image, no matter the screen size
         * It’s easy to find an images height to width ratio:
         * Image height / Image width * 100
         * For the images in our example, image height: 217 and width: 325 we found the ratio:
         * 217px / 325px * 100 = 66.769230769
         *
         * Caveats:
         *   To accomodate different aspect ratios, create multiple image containers and use them where appropriate.
         *   Use this technique only where the aspect ratio is certain; images that don’t fit the aspect ratio will look distorted.
         *   A common challenge in responsive design – not just with this technique – is maintaining the right image quality for each screen.
         *
         *   Check out the Smashing Magazine article below for ideas on this.
         *   Thanks to Smashing Magazine for this technique. Check out a case study of a news site that implemented it successfully, and a similar technique for embedded content.
         *   http://www.smashingmagazine.com/2013/09/16/responsive-images-performance-problem-case-study/
         *   http://www.smashingmagazine.com/2014/02/27/making-embedded-content-work-in-responsive-design/
         * @type {[type]}
         */
        imageRatio: PropTypes.number,
        /**
         * Unique name for referencing dom element in automation testing
         * @type {String}
         */

        automationId: PropTypes.string,

        animate: PropTypes.bool,
        onImageLoad: PropTypes.func,
        onImageError: PropTypes.func,
    };

    static defaultProps = {
        alt: '',
        src: '../images/placeholder.png', // This asset needs to added as per UX
        imageRatio: 100,
        automationId: '',
        animate: false,
        onImageLoad: () => {},
        onImageError: () => {},
    };

    render() {
        const { alt, imageRatio, automationId, onImageLoad, onImageError } = this.props;
        const src = this.props.src ? this.props.src.replace(/^http[s]?:/, '') : '';

        // Wrap this css to stop the page jump around when images are loading
        const imageWrapperClass = cx({
            [styles.imageBoxMain]: (imageRatio > 0),
        });

        // This class is for the image
        const imageClass = cx({
            [styles.imageClass]: (imageRatio > 0),
            [styles.image]: (imageRatio <= 0),
        });

        // We have to add this styling to div once we figure out the imageRatio issue fix.
        const imageStyle = {};

        if (this.props.imageRatio > 0) {
            imageStyle.paddingBottom = `${this.props.imageRatio}%`;
        }

        const animateClass = cx({
            [styles.imageAnim]: this.props.animate,
        });

        return (
            <div className={imageWrapperClass} style={imageStyle}>
                <img
                    className={cx(imageClass, animateClass)}
                    src={src} alt={alt}
                    data-automation-id={automationId}
                    onLoad={onImageLoad}
                    onError={onImageError}
                />
            </div>
        );
    }
}
export default Image;
