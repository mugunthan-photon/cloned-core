import React, { Component, PropTypes } from 'react';


export default class FeatureFlag extends Component {

    /**
     * Supported react properties
     * @type {Object}
     */
    static propTypes = {
        name: PropTypes.string.isRequired,
        children: PropTypes.node,
    };

    static defaultProps = {
        name: '',
        children: null,
    }

    static contextTypes= {
        featureFlags: PropTypes.oneOfType([PropTypes.object]).isRequired,
    }

    /**
     * This method tells us if the the feature flag is turned on or off.
     *
     * @param {String} name Name of the feature flag
     * @return {Boolean} Whether the feature is turned on.
     */
    getFeatureFlag(name) {
        const { featureFlags } = this.context;
        const negate = name.indexOf('!') === 0;
        if (negate) {
            name = name.substr(1);
        }
        const [head, ...tail] = name.split('.');

        let result = (featureFlags && featureFlags[head]) || false;

        for (let iterator = 0; iterator < tail.length; iterator += 1) {
            const key = tail[iterator];
            result = result[key];

            if (result === undefined || result === null) {
                return false;
            }
        }

        return negate ? !result : result;
    }

    render() {
        const { children, name } = this.props;
        const featureFlag = this.getFeatureFlag(name);
        let content = null;
        if (featureFlag) {
            content = (
                <span>
                    { children }
                </span>
            );
        }

        return content;
    }
}
