import React, { Component } from 'react';
import ScriptLoader from '../ScriptLoader';

class ScriptLoaderStory extends Component {

    constructor(props) {
        super(props);

        this.state = {
            placeholderId: new Date().getTime(),
        };
    }

    componentWillMount = () => {
        const onSuccess = () => {
            document.getElementById(this.state.placeholderId).innerHTML = 'Script loaded successfully!!!';
        };

        const onError = () => {
            document.getElementById(this.state.placeholderId).innerHTML = 'Script loaded failed!!!';
        };

        ScriptLoader.load({
            src: 'https://code.jquery.com/jquery-2.2.4.min.js',
            onSuccess,
            onError,
        });
    };

    render() {
        return (
            <div>
                <div id={this.state.placeholderId}>Loading scripts....</div>
            </div>
        );
    }
}

export default ScriptLoaderStory;
