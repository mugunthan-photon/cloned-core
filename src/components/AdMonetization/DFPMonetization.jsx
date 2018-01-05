import React, { Component, PropTypes } from 'react';
import MonetizeConstants from './AdMonetizeConstants';
import ScriptLoader from '../../helpers/ScriptLoader/ScriptLoader';
/* eslint-disable */

/**
 * DFPMonetization component helps you in displaying DFP Ads with different dimensions.
 * Currently built with the basic options, can enhance it based on the requirement.
 *
 * User can just Pass the ID to render the AD in to, which gives you dynamicity and reduces
 * staticness to have a DIV with a particular ID
 *
 * Note* Modifiy the component based on the reuirement
 * Reference URL for further implementations: https://developers.google.com/doubleclick-gpt/reference
 */

class DFPMonetization extends Component {

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
        width: PropTypes.number.isRequired,

        /**
         * height of ad to render.
         * @type {string}
         */
        height: PropTypes.number.isRequired,

        /**
         * adslot string.
         * @type {string}
         */
        adslot: PropTypes.string.isRequired,

        /**
         * position your ad to be placed in.
         * @type {string}
         */
        pos: PropTypes.string.isRequired,
    };

    static loadScripts() {
        window.googletag = window.googletag || {};

        // Adding Krux to the global context to be accessible to our component
        window.Krux = window.Krux || {};

        googletag.cmd = googletag.cmd || [];
        const protocol = document.location.protocol;
        const { gptURL, kruxURL } = MonetizeConstants.libraries;
        // Initiating googletagservices inclusion
        const gptSrc = `${protocol}//${gptURL}`;
        const srcFile = {
            src: gptSrc,
            async: true,
        };
        ScriptLoader.load(srcFile);

        // Initiating Krux script inclusion
        const kruxSrc = `${protocol}//${kruxURL}`;
        const kruxSrcFile = {
            src: kruxSrc,
            async: true,
        };
        ScriptLoader.load(kruxSrcFile);
    }

    /**
     * static function to displayad
     * takes the id to render into.
     */
    static displayAd(id) {
        /* istanbul ignore next */
        googletag.cmd.push(() => {
            googletag.display(id);
        });
    }

    componentWillMount() {
        /**
         * Loading the library if it is not loaded
         */
        if (!DFPMonetization.isLibrariesLoaded) {
            DFPMonetization.loadScripts();
            DFPMonetization.isLibrariesLoaded = true; // setting to true so that it doesn't load scripts again for new instance.
        }
    }

    componentDidMount() {
        googletag.cmd = googletag.cmd || [];
        /* istanbul ignore next */
        googletag.cmd.push(() => {
            googletag.defineSlot(this.props.adslot,
                [
                    [
                        this.props.width, this.props.height
                    ]
                ], this.props.id)
                .setTargeting('pos', this.props.pos)
                .setCategoryExclusion('homepage')
                .addService(googletag.pubads());

            // Start ad fetching
            googletag.pubads().setTargeting('ksg', Krux.segments);
            googletag.pubads().setTargeting('kuid', Krux.user);

            // collapse div without ad
            googletag.pubads().collapseEmptyDivs();

            // Enables single request mode for fetching multiple ads
            googletag.pubads().enableSingleRequest();

            // add support for async loading
            googletag.pubads().enableAsyncRendering();

            // enable google publisher tag
            googletag.enableServices();
        });

        DFPMonetization.displayAd(this.props.id);
    }

    shouldComponentUpdate(nextProps) {
        return this.props.id !== nextProps.id;
    }

    render() {
        const { width, height, id } = this.props;

        return (
            <div style={{ width, height }}>
                <div id={id}/>
            </div>
        );
    }
}


export default DFPMonetization;


// TODO :: discuss on using waypoint
// way point helps in loading things when moved/scrolled to the viewport e.x load more on scroll
/* <Waypoint onEnter={() => this.displayAd(this.id)} /> */
/** Use it when the Responsive ads are available */
// const responsiveMapping = googletag.sizeMapping()
// .addSize([1024, 768], [728, 90])
// .addSize([980, 690], [[728, 90], [468, 60]])
// .addSize([640, 480], [120, 60])
// .addSize([0, 0], [88, 31])
// .build();

// add .defineSizeMapping(responsiveMapping) to defineSlot

