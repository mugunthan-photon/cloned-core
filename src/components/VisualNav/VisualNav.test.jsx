import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import VisualNav from './VisualNav';
import mockData from './__stories/MockData';

describe('<VisualNav />', () => {
    let wrapper;

    beforeEach(() => {
        const title = 'title';
        // Shallow Rendering component in before each to eliminate duplication
        wrapper = shallow(<VisualNav navTitle={title} />);
    });

    it('DepartmentCard component should exist ', () => {
        expect(wrapper).to.exist;
    });

    it('DepartmentCard component should contain an list component', () => {
        expect(wrapper.find('list')).to.exist;
    });
});

describe('<VisualNav />', () => {
    let wrapper;

    beforeEach(() => {
        const navTheme = 'style';
        // Shallow Rendering component in before each to eliminate duplication
        wrapper = mount(<VisualNav
            navTheme={navTheme} datasource={mockData}
            themeConfig={{ visNavGridTilesList: true }} />);
    });

    it('DepartmentCard component should exist ', () => {
        expect(wrapper).to.exist;
    });

    it('DepartmentCard component should contain an list component', () => {
        expect(wrapper.find('list')).to.exist;
    });

    it('DepartmentCard component should contain an list component', () => {
        const data = [{
            id: 'N-bwo3v',
            title: 'for the home',
            count: '(202)',
            image: 'http://s7d9.scene7.com/is/image/JCPenney//DP1212201317371926M',
            links: [
                {
                    rel: 'canonical',
                    href: 'http://www.jcpenney.com/g/home-store/N-bwo3v?pageType=X2H2',
                },
            ],
        }];
        wrapper.setProps({ datasource: data });
        expect(wrapper.find('a').length).to.equal(1);
    });
});

