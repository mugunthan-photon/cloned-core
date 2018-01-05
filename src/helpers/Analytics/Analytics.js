import extend from 'extend';
import { ScriptLoader } from '../index';
// import Device from '../Device/Device';

/**
 * Private function - used with in a class - contains ensighten lib related functions to tag JCP page events
 * @param eventName - Event name
 */
function triggerEvent(eventName, digitalData) {
    if (window.Bootstrapper) {
        console.log(`ensighten event name: ${eventName}`); // @TODO- PR: ingore this log for now
        if (window.pageDataTracker && window.pageDataTracker.trackAnalyticsEvent) {
            console.log(`window.pageDataTracker.trackAnalyticsEvent available: event name: ${eventName}`); // @TODO- PR: ingore this log for now
            window.pageDataTracker.trackAnalyticsEvent(eventName, digitalData);
        }
    }
}

/**
 * Helper class to track ensighten tag events
 * Helper class will expose below two attribute in a Object(analyticsAPI) to use in page level Components to track any analytics events
 * analyticsConstants {object} - contains unique keys for each page level analytics tagging names
 * track {function} - all page level components will use this function to tag any event related to analytics
 *
 */
class Analytics {

    /**
     * With new instant, it will call init() function and download ensighten related js files
     * though constructor we are exposing only one helper Object to consume ensighten services
     */
    constructor() {
        this.eventQueue = [];
        this.hasInitialised = false;
    }

    /**
     * Initialize analytics Helper component
     * Here it will start download ensighten related js files and appended to document object to available for global window level
     * Once js files are ready to server, on callback success it will trigger all pending events
     */
    init(config) {
        // const deviceType = Device.findDeviceType();
        /* istanbul ignore next */
        if (config) {
            // if (!config.yoda_account && deviceType !== 'OPERA' && deviceType !== 'UNKNOWN') {
            const jqueryLibProps = {
                src: config.jqueryUrl,
                onSuccess: () => {
                    const ensightenLibProps = {
                        src: config.ensightenUrl,
                        onSuccess: this._ensightenLoadedSuccess.bind(this),
                    };
                    ScriptLoader.load(ensightenLibProps);
                },
            };
            ScriptLoader.load(jqueryLibProps);
            // }
        }
    }

    _ensightenLoadedSuccess() {
        if (!this.hasInitialised) {
            this.hasInitialised = true;
            this.submitPendingEvents();
        }
    }
    /**
     * Public function - This will be expose to all page level components to tag event by name
     * @param eventName {string} - event type
     * @param digitalData - {object} contains each page level component data required by ensighten tagging
     * @param reset - {boolean} flag to turn off the extend mode, defaults mode is true - even if not sent, send false to turn off
     */
    track(eventName, digitalData, reset) {
        let data = null;
        if (eventName === 'digitalDataReady') {
            window.digitalData = extend(!!reset, window.digitalData || {}, digitalData || {});
        } else {
            data = digitalData || null;
        }

        if (eventName) {
            if (this.hasInitialised) {
                triggerEvent(eventName, data);
            } else {
                this.eventQueue.push({ eventName, digitalData: data });
            }
        }
    }


    /**
     * This flushes the pending client side events to ensighten
     */
    submitPendingEvents() {
        this.eventQueue.forEach((eventDetails) => {
            triggerEvent(eventDetails.eventName, eventDetails.digitalData);
        });

        this.eventQueue = [];
    }
}

const analytics = new Analytics();
export default analytics;
