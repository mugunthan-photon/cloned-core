import React, { Component, PropTypes } from 'react';
import MonetizeConstants from './AdMonetizeConstants';
import ScriptLoader from '../../helpers/ScriptLoader/ScriptLoader';
/* eslint-disable */

const loadScript = () => {
    const srcFile = {
        src: 'https://www.google.com/adsense/search/ads.js',
        async: true,
    };

    ScriptLoader.load(srcFile);

    /* istanbul ignore next */
    /** Code provided by googl */
    ((g, o) => {
        g[o] = g[o] || function() {
            (g[o].q = g[o].q || []).push(
                    arguments);
        }, g[o].t = 1 * new Date();
    })(window, '_googCsa');
};


class ADSenseSearch extends Component {

    /**
     * isLibrariesLoaded helps in loading
     * require Libraries only once
     * @type {bool}
     */
    static isLibrariesLoaded = false;

    /**
     * Supported React properties
     * @type {Object}
     */
    static propTypes = {

        /**
         * id to render ad in to.
         * @type {string}
         */
        id: PropTypes.string.isRequired,


        /**
         * width of ad to render.
         * @type {string}
         */
        query: PropTypes.string.isRequired,


        /**
         * height of ad to render.
         * @type {string}
         */
        themeConfig: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),

        isAdTest: PropTypes.bool,
    };

    /** @properties {Default set up} [optonal props set] */
    static defaultProps = {
        themeConfig: MonetizeConstants.adBlockConfig,
        isAdTest: false,
    };

    componentDidMount() {
        /**
         * Loading the library if it is not loaded
         */
        /** Moved to Did Mount so as to avoid polluting with server side rendering */
        /* istanbul ignore else */
        if (!ADSenseSearch.isLibrariesLoaded) {
            loadScript();
            ADSenseSearch.isLibrariesLoaded = true; // setting to true so that it doesn't load scripts again for new instance.
        }


        // pageOptions to add
        let pageOptions = {
            pubId: MonetizeConstants.pageOptions.pubId, // Make sure this the correct client ID!
            query: this.props.query,
            adPage: 1,
        };

        /* istanbul ignore else */
        if (this.props.isAdTest) {
            pageOptions = Object.assign({
                adtest: 'on',
            }, pageOptions);
        }

        // Derived from Monetization constants
        const {
            width, number, detailedAttribution, fontFamily,
            fontSizeTitle, fontSizeDescription, fontSizeDomainLink,
            colorTitleLink, colorText, colorDomainLink, linkTarget,
            longerHeadlines,
        } = MonetizeConstants.adBlockConfig;

        // adblock configurations
        const adblock = {
            width,
            number,
            detailedAttribution,
            fontFamily,
            fontSizeTitle,
            fontSizeDescription,
            fontSizeDomainLink,
            colorTitleLink,
            colorText,
            colorDomainLink,
            linkTarget,
            longerHeadlines,
        };

        // User passed config is themeConfig pulls things not passed through default config.
        const themeBlock = Object.assign({ container: this.props.id }, adblock, this.props.themeConfig);

        /**
         * calling google search ads function provided by google
         * with our AD options
         */

        _googCsa('ads', pageOptions, themeBlock);
    }

    shouldComponentUpdate(nextProps) {
        return this.props.id !== nextProps.id;
    }


    render() {
        return (
            <div id={this.props.id}/>
        );
    }
}

export default ADSenseSearch;
