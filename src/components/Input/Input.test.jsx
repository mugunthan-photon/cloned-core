import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import 'ignore-styles';
import sinon from 'sinon';
import Input from './Input';

describe('<Input />', () => {
    let wrapper;

    beforeEach(() => {
        // Shallow Rendering component in before each to eliminate duplication
        wrapper = shallow(<Input/>);
    });

    it('Input component should exist ', () => {
        expect(wrapper).to.exist;
    });

    it('Input component should contain a input component ', () => {
        expect(wrapper.find('input')).to.exist;
    });

    it('contains spec with an expectation', () => {
        expect(wrapper.find('span')).to.exist;
    });

    it('should have default props passed', () => {
        expect(wrapper.find('input').props().type).to.equal('text');
    });

    it('should have able to pass props', () => {
        wrapper.setProps({ type: 'password', name: 'passoword', placeholder: 'password' });
        expect(wrapper.find('input').props().type).to.equal('password');
        expect(wrapper.find('input').props().placeholder).to.equal('password');
    });
});

describe('<Input onChange/>', () => {
    it('should call onChange with shallow', () => {
        const onChange = sinon.spy();
        const onKeyPress = sinon.spy();
        const onBlur = sinon.spy();
        const onFocus = sinon.spy();
        const onKeyUp = sinon.spy();
        const wrapper = mount(<Input
            onChange={onChange}
            onKeyPress={onKeyPress}
            onBlur={onBlur} onFocus={onFocus} onKeyUp={onKeyUp} accepts={{ test: () => true }}/>);
        const input = wrapper.find('input');
        input.simulate('change', { target: { value: 'Shirts' } });
        input.simulate('keyPress', { key: 'Enter' });
        input.simulate('blur', { key: 'tab' });
        input.simulate('focus', { key: 'Enter' });
        input.simulate('keyUp', { key: 'Enter' });
        expect(onChange.called).to.be.true;
        expect(onKeyPress.called).to.be.true;
        expect(onBlur.called).to.be.true;
        expect(onFocus.called).to.be.true;
        expect(onKeyUp.called).to.be.true;
    });

    it('should call events without props callback', () => {
        const onChange = sinon.spy();
        const onKeyPress = sinon.spy();
        const onBlur = sinon.spy();
        const onFocus = sinon.spy();
        const wrapper = mount(<Input
            onChange={null}
            onKeyPress={null}
            onBlur={null}
            onFocus={null}
            onKeyUp={null}
            accepts={{ test: () => false }}/>);
        const input = wrapper.find('input');
        input.simulate('change', {});
        input.simulate('keyPress', {});
        input.simulate('blur', {});
        input.simulate('focus', {});
        input.simulate('keyUp', {});
        expect(onChange.called).to.be.false;
        expect(onKeyPress.called).to.be.false;
        expect(onBlur.called).to.be.false;
        expect(onFocus.called).to.be.false;
    });

    it('should not call onChange with shallow', () => {
        const onChange = sinon.spy();
        const onKeyPress = sinon.spy();
        const onBlur = sinon.spy();
        const onFocus = sinon.spy();
        const wrapper = mount(<Input accepts={null}/>);
        const input = wrapper.find('input');
        input.simulate('change', { target: { value: 'Shirts' } });
        input.simulate('keyUp', {});
        expect(onChange.called).to.be.false;
        expect(onKeyPress.called).to.be.false;
        expect(onBlur.called).to.be.false;
        expect(onFocus.called).to.be.false;
    });

    it('should call onChange with shallow', () => {
        const onChange = sinon.spy();
        const onKeyPress = sinon.spy();
        const wrapper = mount(<Input onChange={onChange}/>);
        const input = wrapper.find('input');
        input.simulate('change', { target: { value: 'Shirts' } });
        input.simulate('keyPress', { key: 'Enter' });
        expect(onChange.called).to.be.true;
        expect(onKeyPress.called).to.be.false;
    });

    it('should call onChange with shallow', () => {
        const onChange = sinon.spy();
        const onKeyPress = sinon.spy();
        const wrapper = mount(<Input onKeyPress={onKeyPress} />);
        const input = wrapper.find('input');
        input.simulate('change', { target: { value: 'Shirts' } });
        input.simulate('keyPress', { key: 'Enter' });
        expect(onChange.called).to.be.false;
        expect(onKeyPress.called).to.be.true;
    });

    it('should call copy paste and cut', () => {
        const onChange = sinon.spy();
        const onKeyPress = sinon.spy();
        const onPaste = sinon.spy();
        const onCut = sinon.spy();
        const onCopy = sinon.spy();
        const wrapper = mount(<Input
            onChange={onChange}
            onCopy={onCopy}
            onCut={onCut}
            onPaste={onPaste}
            onKeyPress={onKeyPress} />);
        const input = wrapper.find('input');
        input.simulate('copy', {});
        input.simulate('paste', {});
        input.simulate('cut', {});
        expect(onPaste.called).to.be.true;
        expect(onCut.called).to.be.true;
        expect(onCopy.called).to.be.true;
    });

    it('work with default cut copy and paste', () => {
        const onChange = sinon.spy();
        const onKeyPress = sinon.spy();
        const onPaste = sinon.spy();
        const onCut = sinon.spy();
        const onCopy = sinon.spy();
        const wrapper = mount(<Input
            onChange={onChange}
            onKeyPress={onKeyPress} />);
        const input = wrapper.find('input');
        input.simulate('copy', {});
        input.simulate('paste', {});
        input.simulate('cut', {});
        expect(onPaste.called).to.be.false;
        expect(onCut.called).to.be.false;
        expect(onCopy.called).to.be.false;
    });
});


describe('<Input type="text" name="Customer" value="Customer" ariaRequired={true} required={true} readOnly={true}/>', () => {
    let wrapper;

    beforeEach(() => {
        // Shallow Rendering component in before each to eliminate duplication
        wrapper = shallow(<Input type="text" name="Customer" value="Customer" ariaRequired required readOnly/>);
    });

    it('contains spec with an expectation', () => {
        expect(wrapper.find('required')).to.exist;
    });

    it('contains spec with an expectation', () => {
        expect(wrapper.contains('ariaRequired')).to.exist;
    });

    it('contains spec with an expectation', () => {
        expect(wrapper.contains('readOnly')).to.exist;
    });
});

describe('data-tlprivate="true"', () => {
    let wrapper;

    beforeEach(() => {
        // Shallow Rendering component in before each to eliminate duplication
        wrapper = shallow(<Input type="text" name="Customer" value="Customer" datatlPrivate ariaRequired required readOnly/>);
    });

    it('Input component should exist ', () => {
        expect(wrapper).to.exist;
    });
});
