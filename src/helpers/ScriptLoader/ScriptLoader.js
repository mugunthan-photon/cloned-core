/* istanbul ignore next */
const onError = () => {};
const defaultParams = {
    async: true,
    defer: true,
    onSuccess: () => {},
    onError,
};

class ScriptLoader {
    static load(params) {
        if (!__SERVER__) {
            const props = Object.assign(true, {}, defaultParams, params);
            const scriptEl = document.createElement('script');

            scriptEl.src = props.src;
            scriptEl.async = props.async;
            scriptEl.defer = props.defer;
            scriptEl.crossorigin = props.crossorigin;

            scriptEl.onload = props.onSuccess;
            scriptEl.onerror = props.onError;

            document.body.appendChild(scriptEl);
        } else {
            throw new Error('notSupportedException');
        }
    }
}

export default ScriptLoader;
