import React, { Component } from 'react';
import LocalStorageHelper from '../LocalStorage';

class LocalStorageStory extends Component {

    constructor(props) {
        super(props);

        this.sampleData = {
            a: 10,
            b: 20,
        };
    }

    componentWillMount() {
        this.setDataResult = LocalStorageHelper.setData('sampleData', this.sampleData);
        this.getDataResult = LocalStorageHelper.getData('sampleData');

        console.log('setDataResult', this.setDataResult);
        console.log('getDataResult', this.getDataResult);
    }

    render() {
        return (
            <pre>
                setDataResult: {this.setDataResult.toString()} <br />
                getDataResult: {JSON.stringify(this.getDataResult)} <br />
            </pre>
        );
    }
}

export default LocalStorageStory;
