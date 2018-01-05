import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import List from './List';

/* Sample data for list component */
const listArr = [
    {
        text: 'Item 1',
        id: 1,
    },
    {
        text: 'Item 2',
        originalPrice: '44',
        id: 2,
    },
    {
        text: 'Item 3',
        originalPrice: '44',
        id: 3,
    },
];

const listArrtest = [];

const listitemRenderer = dataItem => <span key={dataItem.id}>{dataItem.text}</span>;

describe('Test Suite for <List /> ', () => {
    let wrapper;

    beforeEach(() => {
        // Shallow Rendering component in before each to eliminate duplication
        wrapper = shallow(<List title="List" itemsPerRow="2" bordered="true" datasource={listArr} direction="Wrap" childRenderer={listitemRenderer}/>);
    });

    it('List component empty datasource ', () => {
        wrapper = shallow(<List title="List" itemsPerRow="2" bordered="true" datasource={listArrtest} direction="Wrap" childRenderer={listitemRenderer}/>);
        expect(wrapper).to.exist;
    });

    it('List component should exist ', () => {
        expect(wrapper).to.exist;
    });

    it.skip('renders the root div with right calls to renderTitle() and renderList()', () => {
        expect(wrapper.find('h3')).to.equal('abc');
    });

    it.skip('component should contain a div tag as a parent', () => {
        expect(wrapper.type()).to.equal('div');
    });

    it.skip('should be able to render children', () => {
        expect(wrapper.props().children).to.equal('Product Name:');
    });
});
