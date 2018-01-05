import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import DropdownMenu from './DropdownMenu';
import { dropDownMenuData, dropDownMenuDataWithSubTitle } from './__stories/mock';
import * as styles from './DropdownMenu.css';

const dropdownMenuRenderer = dataItem => (
    <a className={styles.menuListItemLink} href={dataItem.pageUrl}> {dataItem.name} </a>
);

describe('<DropdownMenu />', () => {
    let wrapper;

    beforeEach(() => {
        // Shallow Rendering component in before each to eliminate duplication
        wrapper =
            mount(<DropdownMenu datasource={dropDownMenuData} childRenderer={dropdownMenuRenderer} />);
    });

    it('DropdownMenu component should exist ', () => {
        expect(wrapper).to.exist;
    });

    it('DropdownMenu component should contain an List component', () => {
        expect(wrapper.find('List')).to.exist;
    });

    it('List component should contain all the menu list items', () => {
        expect(wrapper.find('ul').children()).to.have.length(dropDownMenuData.menuList.length);
    });

    it('onClickMenuHandler should be called', () => {
        const spyFunc = sinon.spy();
        const dropdownComponent = mount(<DropdownMenu
            datasource={dropDownMenuData}
            childRenderer={dropdownMenuRenderer}
            handleMenuClick={spyFunc}
        />);
        dropdownComponent.find('button').at(1).simulate('click');
        expect(spyFunc.calledOnce).to.equal(true);
    });

    it('onClickCloseHandler should be called', () => {
        const spyFuncOnClickCloseHandler = sinon.spy();
        const dropdownComponent = mount(<DropdownMenu
            datasource={dropDownMenuData}
            childRenderer={dropdownMenuRenderer}
            handleCloseClick={spyFuncOnClickCloseHandler}
        />);
        dropdownComponent.find('button').at(0).simulate('click');
        expect(spyFuncOnClickCloseHandler.calledOnce).to.equal(true);
    });

    it('onClickSubTitleHandler should be called', () => {
        const spyFuncOnClickSubTitleHandler = sinon.spy();
        const spyFuncOnClickCloseHandler = sinon.spy();
        const dropdownComponent = mount(<DropdownMenu
            datasource={dropDownMenuDataWithSubTitle}
            childRenderer={dropdownMenuRenderer}
            handleSubTitleClick={spyFuncOnClickSubTitleHandler}
            handleCloseClick={spyFuncOnClickCloseHandler}
        />);
        dropdownComponent.find('button').at(1).simulate('click');
        expect(spyFuncOnClickSubTitleHandler.calledOnce).to.equal(true);
    });
    it('ShowClose button not to render ', () => {
        const dropdownComponent = mount(<DropdownMenu
            datasource={dropDownMenuData}
            childRenderer={dropdownMenuRenderer}
            showClose={false}
        />);
        expect(dropdownComponent.find('button').at(0).props().children[0].props.children[0]).equal('Sign in');
    });
    it('ShowTitle title not to render', () => {
        const menuData = {
            menuList: [
                {
                    name: 'Sign in',
                    url: 'sign-in',
                    leaf: true,
                },
                {
                    name: 'Create Account',
                    url: 'create-account',
                    leaf: true,
                },
                {
                    name: 'Create Accounts',
                    url: 'create-account',
                    suffix: 'sample',
                    leaf: true,
                },
            ],
        };
        const dropdownComponent = mount(<DropdownMenu
            datasource={menuData}
            childRenderer={dropdownMenuRenderer}
            ShowTitle={false}
        />);
        expect(dropdownComponent.find('span').at(0).props().children[0]).equal('Sign in');
    });
    it('Check if leaf is false not to have hide element', () => {
        const menuData = {
            menuList: [
                {
                    name: 'Sign in',
                    url: 'sign-in',
                    leaf: false,
                },
                {
                    name: 'Create Account',
                    url: 'create-account',
                    leaf: false,
                },
            ],
        };
        const dropdownComponent = mount(<DropdownMenu
            datasource={menuData}
            childRenderer={dropdownMenuRenderer}
        />);
        expect(dropdownComponent.find('button i.hide').length).equal(0);
    });
});
