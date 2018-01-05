const defaults = {
    slowLatencyValue: 1000,
};
/* istanbul ignore next - JSDOM does not support and this is development tool */
class PerformanceHelper {

    constructor(params) {
        if (__SERVER__ || !performance || !performance.timing) {
            throw new Error('notSupportedException');
        }

        this.config = Object.assign(defaults, params);
        this.timing = performance.timing || {};
    }

    isSlowNetwork() {
        return new Promise((resolve, reject) => {
            function _resolve() {
                const loadingTime = this.timing.domContentLoadedEventEnd - this.timing.domLoading;
                const isSlowNetwork = (loadingTime >= this.config.slowLatencyValue);

                resolve(isSlowNetwork);
            }

            try {
                if (this.timing.domContentLoadedEventEnd) {
                    _resolve();
                } else {
                    window.addEventListener('load', () => {
                        _resolve.call(this);
                    }, {
                        once: true,
                    });
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    getMetrics() {
        return {
            time: new Date(),
            isSlowNetwork: this.isSlowNetwork(),
            timing: this.timing,
        };
    }
}

export default PerformanceHelper;
