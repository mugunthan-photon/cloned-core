import { expect, assert } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { beforeEach, describe, it } from 'mocha';
import React from 'react';
import BreadCrumbs from './BreadCrumbs';
import Crumbs from './Crumbs';

describe('<BreadCrumbs />', () => {
    let wrapper;

    describe('Breadcrumb no seperator', () => {
        beforeEach(() => {
            wrapper = mount(
                <BreadCrumbs>
                    <Crumbs path="/path/Jcpenney">JCPenney</Crumbs>
                </BreadCrumbs>,
            );
        });

        it('Bread Crumbs component should exist ', () => {
            expect(wrapper).to.exist;
        });

        // it('should have 3 crumbs, and final crumb should have isActive prop', () => {
        //     expect(wrapper.find('Crumbs')).to.have.length(3);
        //     expect(wrapper.find('Crumbs').at(2).props().isActive).to.equal(true);
        // });
    });

    describe('Breadcrumb with separator', () => {
        beforeEach(() => {
            wrapper = mount(
                <BreadCrumbs separator="slash">
                    <Crumbs path="/path/Jcpenney">JCPenney</Crumbs>
                    <Crumbs path="/path/Appliances">Appliances</Crumbs>
                    <Crumbs isActive>Refrigerators</Crumbs>
                </BreadCrumbs>,
            );
        });

        it('Bread Crumbs component should exist ', () => {
            expect(wrapper).to.exist;
        });

        it('Crumbs createlink with soft route ', () => {
            const softRoute = true;
            const wrapperCrums = mount(<Crumbs softRoute={softRoute} onClick={false} path="/path/Appliances">Appliances</Crumbs>);
            const instance = wrapperCrums.instance();

            expect(instance.createLink('dummy-theame', '/', 'home')).to.be.an('object');
        });

        it('should have 3 crumbs, and final crumb should have isActive prop', () => {
            expect(wrapper.find('Crumbs')).to.have.length(3);
            expect(wrapper.find('Crumbs').at(2).props().isActive).to.equal(true);
        });
    });

    describe('Breadcrumb with separator', () => {
        const onClick = sinon.stub();
        beforeEach(() => {
            onClick.reset();
            wrapper = mount(
                <BreadCrumbs separator="slash">
                    <Crumbs onClick={onClick}>Refrigerators</Crumbs>
                </BreadCrumbs>,
            );
        });

        it('should add on click and call the onclick function', () => {
            assert.isFunction(wrapper.find('Crumbs').get(0).props.onClick);
            wrapper.find('a').simulate('click');
            expect(onClick.called).to.be.true;
        });
    });
});
