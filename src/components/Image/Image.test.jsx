import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import Image from './Image';

describe('<Image />', () => {
    it('should have a div ', () => {
        const wrapper = shallow(<Image />);
        expect(wrapper.find('div')).to.have.length(1);
        expect(wrapper.find('img')).to.have.length(1);
    });

    it('should have deafult props passed', () => {
        const wrapper = mount(<Image />);
        expect(wrapper.find('img').props().alt).to.equal('');
        expect(wrapper.find('img').props().src).to.equal('../images/placeholder.png');
        expect(wrapper.props().imageRatio).to.equal(100);
    });

    it('should have able to pass props', () => {
        const wrapper = mount(<Image />);
        wrapper.setProps({ src: '../images/placeholder2.png', alt: 'Hello', imageRatio: 0 });
        expect(wrapper.find('img').props().alt).to.equal('Hello');
        expect(wrapper.find('img').props().src).to.equal('../images/placeholder2.png');
        expect(wrapper.props().imageRatio).to.equal(0);
    });

    it('should remove https from path', () => {
        const wrapper = mount(<Image />);
        wrapper.setProps({ src: 'https://s7d9.scene7.com/is/image/JCPenney//DP1215201417015785M', alt: 'Hello', imageRatio: 0 });
        expect(wrapper.find('img').props().alt).to.equal('Hello');
        expect(wrapper.find('img').props().src).to.equal('//s7d9.scene7.com/is/image/JCPenney//DP1215201417015785M');
        expect(wrapper.props().imageRatio).to.equal(0);
    });

    it('should remove http from path', () => {
        const wrapper = mount(<Image />);
        wrapper.setProps({ src: 'http://s7d9.scene7.com/is/image/JCPenney//DP1215201417015785M', alt: 'Hello', imageRatio: 0 });
        expect(wrapper.find('img').props().alt).to.equal('Hello');
        expect(wrapper.find('img').props().src).to.equal('//s7d9.scene7.com/is/image/JCPenney//DP1215201417015785M');
        expect(wrapper.props().imageRatio).to.equal(0);
    });

    it('should render default image if supplied with null', () => {
        const wrapper = mount(<Image />);
        wrapper.setProps({ src: null, alt: 'Hello', imageRatio: 0 });
        expect(wrapper.find('img').props().alt).to.equal('Hello');
        expect(wrapper.find('img').props().src).to.equal('');
        wrapper.find('img').props().onLoad();
        wrapper.find('img').props().onError();
        expect(wrapper.props().imageRatio).to.equal(0);
    });
});
