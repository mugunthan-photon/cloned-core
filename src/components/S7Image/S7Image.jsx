import React, { Component, PropTypes } from 'react';
import Image from '../Image/Image';

const defaultSrc = '../images/placeholder.png';
const filterImageUrlExtension = (imageUrl) => {
    const src = imageUrl.trim().replace(/(\.jpg|\.tif|\.png|\.gif|\.jpeg)$/gi, '');
    return src;
};

/**
 * To process the imageUrl to get low resolution images and remove unwanted file extensions from the URL
 * @param imageURL
 * @param recipe
 * @returns {*}
 */
const processImageURL = (imageURL, recipe) => {
    let src = imageURL;

    if (src && src !== defaultSrc) {
        src = filterImageUrlExtension(src);
        if (recipe) {
            src = `${src}?${recipe}`;
        }
        return src;
    }
    return defaultSrc;
};


class S7Image extends Component {

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

        /**
         * Query parameter to be used along with the imageURl to get low resolution image
         * Its optional parameter
         */
        recipe: PropTypes.string,
    };

    static defaultProps = {
        alt: '',
        src: defaultSrc, // This asset needs to added as per UX
        imageRatio: 100,
        automationId: '',
        animate: false,
        recipe: '',
    };

    render() {
        const { src, alt, recipe, imageRatio, automationId, animate } = this.props;

        return (
            <Image
                alt={alt}
                src={processImageURL(src, recipe)}
                imageRatio={imageRatio}
                automationId={automationId}
                animate={animate}
            />
        );
    }
}

export default S7Image;
