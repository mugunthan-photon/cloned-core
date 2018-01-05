import { Component, PropTypes } from 'react';

class ContextProvider extends Component {

    static contextType = {
        featureFlags: PropTypes.oneOfType([PropTypes.object]).isRequired,
    };

    static ContextType = PropTypes.shape(ContextProvider.contextType);

    static childContextTypes = ContextProvider.contextType;

    static propTypes = {
        context: PropTypes.objectOf(ContextProvider.ContextType).isRequired,
        children: PropTypes.element.isRequired,
    };

    getChildContext() {
        return this.props.context;
    }

    render() {
        return this.props.children;
    }
}

export default ContextProvider;
