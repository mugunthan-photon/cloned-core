import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { describe, it } from 'mocha';

import S7Image from './S7Image';

const imageUrlWithExt = 's7d9.scene7.com/is/image/JCPenney//DP1003201417030645M.tif';
const imageUrlWithNoExt = 's7d9.scene7.com/is/image/JCPenney//DP1003201417030645M';

describe('<S7Image />', () => {
    it('should have a div ', () => {
        const wrapper = mount(<S7Image />);
        // expect(wrapper.find('div')).to.have.length(1);
        expect(wrapper.find('img')).to.have.length(1);
    });

    it('should have deafult props passed', () => {
        const wrapper = mount(<S7Image />);
        expect(wrapper.find('img').props().alt).to.equal('');
        expect(wrapper.find('img').props().src).to.equal('../images/placeholder.png');
        expect(wrapper.props().imageRatio).to.equal(100);
        expect(wrapper.props().automationId).to.equal('');
        expect(wrapper.props().recipe).to.equal('');
        expect(wrapper.props().animate).to.equal(false);
    });

    it('should have able to pass props', () => {
        const wrapper = mount(<S7Image />);
        wrapper.setProps({
            src: imageUrlWithExt,
            alt: 'Hello',
            imageRatio: 90,
            automationId: 'test-automationid',
            recipe: '$department_main$',
            animate: true,
        });
        expect(wrapper.find('img').props().alt).to.equal('Hello');
        expect(wrapper.find('img').props().src).to.equal(`${imageUrlWithNoExt}?$department_main$`);
        expect(wrapper.props().imageRatio).to.equal(90);
        expect(wrapper.props().automationId).to.equal('test-automationid');
        expect(wrapper.props().recipe).to.equal('$department_main$');
        expect(wrapper.props().animate).to.equal(true);
    });

    it('should success for S7Image Url without extension and without recipe ', () => {
        const wrapper = mount(<S7Image />);

        // url, recipe: "http://s7d9.scene7.com/is/image/JCPenney//DP1003201417030645M", ''
        wrapper.setProps({
            src: imageUrlWithNoExt,
        });
        expect(wrapper.find('img').props().src).to.equal(imageUrlWithNoExt);
        expect(wrapper.props().recipe).to.equal('');
    });

    it('should success for S7Image Url without extension and with recipe ', () => {
        const wrapper = mount(<S7Image />);

        // url, recipe: "http://s7d9.scene7.com/is/image/JCPenney//DP1003201417030645M", $department_main$
        wrapper.setProps({
            src: imageUrlWithNoExt,
            recipe: '$department_main$',
        });
        expect(wrapper.find('img').props().src).to.equal(`${imageUrlWithNoExt}?$department_main$`);
        expect(wrapper.props().recipe).to.equal('$department_main$');
    });

    it('should success for S7Image Url with extension and without recipe ', () => {
        const wrapper = mount(<S7Image />);

        // url, recipe: "http://s7d9.scene7.com/is/image/JCPenney//DP1003201417030645M.tif", ''
        wrapper.setProps({
            src: imageUrlWithExt,
        });
        expect(wrapper.find('img').props().src).to.equal(imageUrlWithNoExt);
        expect(wrapper.props().recipe).to.equal('');
    });

    it('should success for S7Image Url with extension and recipe ', () => {
        const wrapper = mount(<S7Image />);

        // url, recipe: "http://s7d9.scene7.com/is/image/JCPenney//DP1003201417030645M.tif", $department_main$
        wrapper.setProps({
            src: imageUrlWithExt,
            recipe: '$department_main$',
        });
        expect(wrapper.find('img').props().src).to.equal(`${imageUrlWithNoExt}?$department_main$`);
        expect(wrapper.props().recipe).to.equal('$department_main$');
    });

    it('should fallback to default image if null', () => {
        const wrapper = mount(<S7Image />);

        // url, recipe: "http://s7d9.scene7.com/is/image/JCPenney//DP1003201417030645M.tif", $department_main$
        wrapper.setProps({
            src: null,
            recipe: '$department_main$',
        });
        expect(wrapper.find('img').props().src).to.equal('../images/placeholder.png');
        expect(wrapper.props().recipe).to.equal('$department_main$');
    });
});
