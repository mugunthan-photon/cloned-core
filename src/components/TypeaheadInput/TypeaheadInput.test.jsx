import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { beforeEach } from 'mocha';
import sinon from 'sinon';
import TypeaheadInput from './TypeaheadInput';
import { storyData, data } from './__stories/mock';

describe('<TypeaheadInput/>', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(<TypeaheadInput dataSource={storyData} data={data} />);
    });

    it('TypeaheadInput component should exist ', () => {
        expect(wrapper).to.exist;
    });

    it('TypeaheadInput component should contain an Input component', () => {
        expect(wrapper.find('Input')).to.exist;
    });

    it('TypeaheadInput component should contain show drop down menu ', () => {
        const input = wrapper.find('Input');
        input.simulate('change', { target: { value: 'Shirts' } });
        // When input has search input change, verify the dropdownmenu will show
        expect(wrapper.find('div')).to.exist;
        expect(wrapper.find('li')).to.exist;
    });
});

describe('<TypeaheadInput/> events', () => {
    it('should call onChange with shallow', () => {
        const onChange = sinon.spy();
        const wrapper = mount(<TypeaheadInput onChange={onChange} />);
        const input = wrapper.find('input');
        input.simulate('change', { target: { value: 'Shirts' } });
        expect(onChange.called).to.be.true;
    });

    it('should call onKeyDown up arrow with shallow', () => {
        const wrapper = mount(<TypeaheadInput />);
        wrapper.setState({
            currentSelection: 1,
        });
        wrapper.setProps({
            data,
        });
        wrapper.instance().onKeyDown({ keyCode: 38, preventDefault: () => { } });
        expect(wrapper.state().currentSelection).to.be.equal(0);
    });

    it('should call onKeyDown up arrow with shallow last level', () => {
        const wrapper = mount(<TypeaheadInput />);
        wrapper.setState({
            currentSelection: 0,
        });
        wrapper.setProps({
            data,
        });
        wrapper.instance().onKeyDown({ keyCode: 38, preventDefault: () => { } });
        expect(wrapper.state().currentSelection).to.be.equal(0);
    });

    it('should call onKeyDown up arrow with shallow', () => {
        const wrapper = mount(<TypeaheadInput />);
        wrapper.setState({
            currentSelection: 1,
        });
        wrapper.setProps({
            data,
        });
        wrapper.instance().onKeyDown({ keyCode: 40, preventDefault: () => { } });
        expect(wrapper.state().currentSelection).to.be.equal(2);
    });

    it('should call onKeyDown up arrow with shallow last level', () => {
        const wrapper = mount(<TypeaheadInput />);
        wrapper.setState({
            currentSelection: data.length - 1,
        });
        wrapper.setProps({
            data,
        });
        wrapper.instance().onKeyDown({ keyCode: 40, preventDefault: () => { } });
        expect(wrapper.state().currentSelection).to.be.equal(data.length - 1);
    });

    it('should call onKeyDown up arrow with shallow unknow data', () => {
        const wrapper = mount(<TypeaheadInput />);
        wrapper.setState({
            currentSelection: data.length,
        });
        wrapper.setProps({
            data,
        });
        wrapper.instance().onKeyDown({ keyCode: 40, preventDefault: () => { } });
        expect(wrapper.state().currentSelection).to.be.equal(data.length);
    });

    it('should call onKeyDown props', () => {
        const wrapper = mount(<TypeaheadInput />);
        wrapper.setState({
            currentSelection: 0,
        });
        const onKeyDown = sinon.spy();
        wrapper.setProps({
            data,
            onKeyDown,
        });
        wrapper.instance().onKeyDown({ keyCode: 40, preventDefault: () => { } });
        expect(onKeyDown.called).to.be.true;
    });

    it('should not call funct with shallow', () => {
        const onChange = sinon.spy();
        const onFocus = sinon.spy();
        const onBlur = sinon.spy();
        const onMouseDown = sinon.spy();
        const onMouseUp = sinon.spy();
        const onMouseOver = sinon.spy();
        const onSubmit = sinon.spy();
        const wrapper = mount(<TypeaheadInput />);
        const input = wrapper.find('input');
        input.simulate('change', { target: { value: 'Shirts' } });
        expect(onChange.called).not.to.be.true;
        input.simulate('focus');
        expect(onFocus.called).not.to.be.true;
        input.simulate('blur');
        expect(onBlur.called).not.to.be.true;
        input.simulate('mousedown');
        expect(onMouseDown.called).not.to.be.true;
        input.simulate('mouseup');
        expect(onMouseUp.called).not.to.be.true;
        input.simulate('mouseover');
        expect(onMouseOver.called).not.to.be.true;
        input.simulate('submit');
        expect(onSubmit.called).not.to.be.true;
    });

    it('should call onFocus', () => {
        const onFocus = sinon.spy();
        const wrapper = mount(<TypeaheadInput onFocus={onFocus} />);
        const input = wrapper.find('Input');
        input.simulate('focus');
        expect(onFocus.called).to.be.true;
    });

    it('should call onBlur', () => {
        const onBlur = sinon.spy();
        const wrapper = mount(<TypeaheadInput onBlur={onBlur} />);
        const input = wrapper.find('Input');
        input.simulate('blur');
        expect(onBlur.called).to.be.true;
    });

    it('should call onMousedown', () => {
        const onMouseDown = sinon.spy();
        const wrapper = mount(<TypeaheadInput onMouseDown={onMouseDown} />);
        const input = wrapper.find('Input');
        input.simulate('mousedown');
        expect(onMouseDown.called).to.be.true;
    });

    it('should call onMouseup', () => {
        const onMouseUp = sinon.spy();
        const wrapper = mount(<TypeaheadInput onMouseUp={onMouseUp} />);
        const input = wrapper.find('Input');
        input.simulate('mouseup');
        expect(onMouseUp.called).to.be.true;
    });

    it('should call Submit', () => {
        const onSubmit = sinon.spy();
        const wrapper = mount(<TypeaheadInput onSubmit={onSubmit} inputText="tsh" />);
        const input = wrapper.find('input');
        input.simulate('submit');
        expect(onSubmit.called).to.be.true;
    });

    it('should not call Submit', () => {
        const onSubmit = sinon.spy();
        const wrapper = mount(<TypeaheadInput onSubmit={onSubmit} />);
        const input = wrapper.find('input');
        input.simulate('keyPress', { key: 'Tab' });
        expect(onSubmit.called).not.to.be.true;
    });

    it('should not call mouseOver', () => {
        const onMouseOver = sinon.spy();
        const wrapper = mount(<TypeaheadInput onMouseOver={onMouseOver} />);
        const input = wrapper.find('input');
        input.simulate('keyPress', { key: 'Tab' });
        expect(onMouseOver.called).not.to.be.true;
    });

    it('should not call mouseOver-instanse', () => {
        const setProductList = sinon.spy();
        const event = {
            target: {
                dataset: {
                    position: 2,
                },
                parentElement: {
                    dataset: {
                        position: 2,
                    },
                    getElementsByTagName() {
                        return [{
                            dataset: {
                                position: 2,
                            },
                        }];
                    },
                },
            },
        };
        const wrapper = mount(<TypeaheadInput />);
        wrapper.instance().onMouseOver(event);
        expect(setProductList.called).to.be.false;
    });

    it('should call Reset', () => {
        const onReset = sinon.spy();
        const wrapper = mount(<TypeaheadInput datasource={storyData} data={data} inputText="Shirts" isFocused onReset={onReset} />);
        const input = wrapper.find('#TypeaheadInputRestBtn');
        input.simulate('click');
        expect(onReset.called).to.be.true;
    });

    it('should not call Reset', () => {
        const onReset = sinon.spy();
        const wrapper = mount(<TypeaheadInput datasource={storyData} data={data} inputText="Shirts" isFocused />);
        const input = wrapper.find('#TypeaheadInputRestBtn');
        input.simulate('click');
        expect(onReset.called).not.to.be.true;
    });

    it('should call Select from items no call', () => {
        const event = {
            target: {
                dataset: {
                    currentitem: 'tshirt in men',
                },
            },
        };
        const onSelect = sinon.spy();
        const wrapper = mount(<TypeaheadInput datasource={storyData} data={data} inputText="Shirt" />);
        const instance = wrapper.instance();
        instance.onSelect(event);
        expect(onSelect.called).to.be.false;
    });

    it('should call Select from items with header', () => {
        const event = {
            target: {
                dataset: {
                    currentitem: 'tshirt in men',
                },
            },
        };
        const onSelect = sinon.spy();
        const wrapper = mount(<TypeaheadInput datasource={storyData} data={data} header=" <b>Recent Search </b>" inputText="Shirt" onSelect={onSelect} />);
        const instance = wrapper.instance();
        instance.onSelect(event);
        expect(onSelect.called).to.be.true;
    });

    it('should call Select from items with current item', () => {
        const event = {
            target: {
                dataset: {
                    currentitem: 'tshirt',
                },
            },
        };

        const onSelect = sinon.spy();
        const wrapper = mount(<TypeaheadInput datasource={storyData} data={data} inputText="Shirt" onSelect={onSelect} />);
        const instance = wrapper.instance();
        instance.onSelect(event);
        expect(onSelect.called).to.be.true;
    });


    it('should call Select from items onselect prop called', () => {
        const event = {
            target: {
                dataset: {
                    currentitem: 'tshirt',
                },
            },
        };

        const onSelect = sinon.spy();
        const onBlur = sinon.spy();
        const wrapper = mount(<TypeaheadInput datasource={storyData} data={data} inputText="Shirt" onSelect={onSelect} onBlur={onBlur} />);

        const instance = wrapper.instance();
        instance.onSelect(event);
        expect(onSelect.called).to.be.true;
    });

    it('should call Select from items no current item ', () => {
        const event = {
            target: {
                dataset: {
                    currentitem: null,
                },
                parentElement: {
                    dataset: {
                        currentitem: '',
                    },
                    getElementsByTagName() {
                        return [{
                            dataset: {
                                currentitem: '',
                            },
                        }];
                    },
                },
            },
        };
        const onSelect = sinon.spy();
        const wrapper = mount(<TypeaheadInput datasource={storyData} data={data} inputText="Shirt" onSelect={onSelect} />);
        const instance = wrapper.instance();
        instance.onSelect(event);
        expect(onSelect.called).to.be.true;
    });

    it('should have the head', () => {
        const wrapper = mount(<TypeaheadInput datasource={storyData} data={data} inputText="Shirt" header=" <b>Recent Search </b>" isFocused />);
        const header = wrapper.find('Recent Search');
        expect(header).to.exist;
    });

    it('should bind featureList - small', () => {
        global.window.innerWidth = 500;
        const showFeatureResult = true;
        const renderCard = sinon.spy();
        const wrapper = mount(<TypeaheadInput
            renderCard={renderCard}
            showFeatureResult={showFeatureResult}
            datasource={storyData}
            data={data}
            inputText="Shirt"
            isFocused />);
        wrapper.instance().setProductList(1);
        expect(renderCard.called).to.be.false;
    });

    it('should bind featureList - small', () => {
        global.window.innerWidth = null;

        const showFeatureResult = true;
        const renderCard = sinon.spy();
        const wrapper = mount(<TypeaheadInput
            renderCard={renderCard}
            showFeatureResult={showFeatureResult}
            datasource={storyData}
            data={data}
            inputText="Shirt"
            isFocused />);
        wrapper.instance().setProductList(1);
        expect(renderCard.called).to.be.false;
    });

    it('should bind featureList - Medium', () => {
        global.window.innerWidth = 700;
        const showFeatureResult = true;
        const renderCard = sinon.spy();
        const wrapper = mount(<TypeaheadInput
            renderCard={renderCard}
            showFeatureResult={showFeatureResult}
            datasource={storyData}
            data={data}
            inputText="Shirt"
            isFocused />);
        wrapper.instance().setProductList(1);
        expect(renderCard.called).to.be.true;
    });

    it('should bind featureList - Large', () => {
        global.window.innerWidth = 1100;
        const showFeatureResult = true;
        const renderCard = sinon.spy();
        const wrapper = mount(<TypeaheadInput
            renderCard={renderCard}
            showFeatureResult={showFeatureResult}
            datasource={storyData}
            data={data}
            inputText="Shirt"
            isFocused />);
        wrapper.instance().setProductList(1);
        expect(renderCard.called).to.be.true;
    });

    it('should bind featureList - X Large', () => {
        global.window.innerWidth = 1500;
        const showFeatureResult = true;
        const renderCard = sinon.spy();
        const wrapper = mount(<TypeaheadInput
            renderCard={renderCard}
            showFeatureResult={showFeatureResult}
            datasource={storyData}
            data={data}
            inputText="Shirt"
            isFocused />);
        wrapper.instance().setProductList(1);
        expect(renderCard.called).to.be.true;
    });

    it('should bind featureList with dept', () => {
        const showFeatureResult = true;
        const renderCard = sinon.spy();
        const wrapper = mount(<TypeaheadInput
            renderCard={renderCard}
            showFeatureResult={showFeatureResult}
            datasource={storyData}
            data={data}
            inputText="Shirt"
            isFocused />);
        wrapper.instance().setProductList(1, 'dept', 1);
        expect(renderCard.called).to.be.true;
    });

    it('should bind featureList not bind - 1', () => {
        const showFeatureResult = true;
        const renderCard = sinon.spy();
        storyData[0].products = null;
        const wrapper = mount(<TypeaheadInput renderCard={renderCard} showFeatureResult={showFeatureResult} datasource={storyData} data={data} inputText="Shirt" header=" <b>Recent Search </b>" isFocused />);
        wrapper.instance();
        expect(renderCard.called).to.be.false;
    });

    it('should bind featureList not bind - 2', () => {
        const showFeatureResult = true;
        const renderCard = sinon.spy();
        const dataTest = [{
            key: 0,
            term: 'Shirts',
        }];
        const wrapper = mount(<TypeaheadInput renderCard={renderCard} showFeatureResult={showFeatureResult} datasource={dataTest} data={data} inputText="Shirt" header=" <b>Recent Search </b>" isFocused />);
        wrapper.instance();
        expect(renderCard.called).to.be.false;
    });

    it('should bind maxLength', () => {
        const showFeatureResult = true;
        const renderCard = sinon.spy();
        const dataTest = [{
            key: 0,
            term: 'Shirts',
        }, {
            key: 0,
            term: 'Shirts',
        }, {
            key: 0,
            term: 'Shirts',
        }, {
            key: 0,
            term: 'Shirts',
        }, {
            key: 0,
            term: 'Shirts',
        }, {
            key: 0,
            term: 'Shirts',
        }, {
            key: 0,
            term: 'Shirts',
        }, {
            key: 0,
            term: 'Shirts',
        }, {
            key: 0,
            term: 'Shirts',
        }, {
            key: 0,
            term: 'Shirts',
        }, {
            key: 0,
            term: 'Shirts',
        }, {
            key: 0,
            term: 'Shirts',
        }, {
            key: 0,
            term: 'Shirts',
        }];
        const wrapper = mount(<TypeaheadInput renderCard={renderCard} showFeatureResult={showFeatureResult} datasource={dataTest} inputText="Shirt" header=" <b>Recent Search </b>" isFocused />);
        wrapper.instance();
        expect(renderCard.called).to.be.false;
    });

    it('should bind featureList not bind - 3', () => {
        const showFeatureResult = true;
        const renderCard = sinon.spy();
        const dataTest = [{
            key: 0,
            term: 'Shirts',
        }];
        const wrapper = mount(<TypeaheadInput renderCard={renderCard} showFeatureResult={showFeatureResult} datasource={dataTest} data={data} inputText="Shirt" header=" <b>Recent Search </b>" isFocused />);
        wrapper.instance().setProductList(1);
        expect(renderCard.called).to.be.false;
    });

    it('should bind featureList not bind - 4', () => {
        const showFeatureResult = true;
        const renderCard = sinon.spy();
        const dataTest = null;
        const wrapper = mount(<TypeaheadInput
            renderCard={renderCard}
            showFeatureResult={showFeatureResult}
            datasource={dataTest}
            inputText="Shirt"
            header=" <b>Recent Search </b>"
            isFocused
        />);
        wrapper.instance();
        expect(renderCard.called).to.be.false;
    });
    it('should bind featureList with dept', () => {
        const showFeatureResult = true;
        const renderCard = sinon.spy();
        const wrapper = mount(<TypeaheadInput
            renderCard={renderCard}
            showFeatureResult={showFeatureResult}
            datasource={storyData}
            data={data}
            inputText="Shirt in Men"
            isFocused />);
        const instance = wrapper.instance();
        instance.setProductList(1, 'dept', 1);
        instance.render();
        const path = wrapper.find('.searchViewAll').props();
        expect(path.href.indexOf('shirts-in-men')).not.equal(-1);
    });
});

describe('suggestion width test', () => {
    let getElementById;
    const actualWidth = global.window.innerWidth;
    beforeEach(() => {
        getElementById = sinon.stub(document, 'getElementById');
    });
    afterEach(() => {
        getElementById.restore();
        global.window.innerWidth = actualWidth;
    });
    it('test the offset width - Small', () => {
        getElementById.returns({
            offsetWidth: 700,
        });
        global.window.innerWidth = 500;

        const showFeatureResult = true;
        const renderCard = sinon.spy();
        const wrapper = mount(<TypeaheadInput
            renderCard={renderCard}
            showFeatureResult={showFeatureResult}
            datasource={storyData}
            data={data}
            inputText="Shirt in Men"
            isFocused />);
        const instance = wrapper.instance();
        instance.setProductList(1, 'dept', 1);
        expect(renderCard.callCount).to.be.equal(0);
    });
    it('test the offset width - Medium - 2', () => {
        getElementById.returns({
            offsetWidth: 600,
        });
        global.window.innerWidth = 700;

        const showFeatureResult = true;
        const renderCard = sinon.spy();
        const wrapper = mount(<TypeaheadInput
            renderCard={renderCard}
            showFeatureResult={showFeatureResult}
            datasource={storyData}
            data={data}
            inputText="Shirt in Men"
            isFocused />);
        const instance = wrapper.instance();
        instance.setProductList(1, 'dept', 1);
        expect(renderCard.callCount).to.be.equal(2);
    });
    it('test the offset width - Medium - 3', () => {
        getElementById.returns({
            offsetWidth: 800,
        });
        global.window.innerWidth = 900;

        const showFeatureResult = true;
        const renderCard = sinon.spy();
        const wrapper = mount(<TypeaheadInput
            renderCard={renderCard}
            showFeatureResult={showFeatureResult}
            datasource={storyData}
            data={data}
            inputText="Shirt in Men"
            isFocused />);
        const instance = wrapper.instance();
        instance.setProductList(1, 'dept', 1);
        expect(renderCard.callCount).to.be.equal(3);
    });
    it('test the offset width - Medium - 4', () => {
        getElementById.returns({
            offsetWidth: 950,
        });
        global.window.innerWidth = 1024;

        const showFeatureResult = true;
        const renderCard = sinon.spy();
        const wrapper = mount(<TypeaheadInput
            renderCard={renderCard}
            showFeatureResult={showFeatureResult}
            datasource={storyData}
            data={data}
            inputText="Shirt in Men"
            isFocused />);
        const instance = wrapper.instance();
        instance.setProductList(1, 'dept', 1);
        expect(renderCard.callCount).to.be.equal(4);
    });
    it('test the offset width - Large - 3', () => {
        getElementById.returns({
            offsetWidth: 600,
        });
        global.window.innerWidth = 1400;

        const showFeatureResult = true;
        const renderCard = sinon.spy();
        const wrapper = mount(<TypeaheadInput
            renderCard={renderCard}
            showFeatureResult={showFeatureResult}
            datasource={storyData}
            data={data}
            inputText="Shirt in Men"
            isFocused />);
        const instance = wrapper.instance();
        instance.setProductList(1, 'dept', 1);
        expect(renderCard.callCount).to.be.equal(3);
    });
    it('test the offset width - Large - 4', () => {
        getElementById.returns({
            offsetWidth: 950,
        });
        global.window.innerWidth = 1400;

        const showFeatureResult = true;
        const renderCard = sinon.spy();
        const wrapper = mount(<TypeaheadInput
            renderCard={renderCard}
            showFeatureResult={showFeatureResult}
            datasource={storyData}
            data={data}
            inputText="Shirt in Men"
            isFocused />);
        const instance = wrapper.instance();
        instance.setProductList(1, 'dept', 1);
        expect(renderCard.callCount).to.be.equal(4);
    });
    it('test the offset width - X-Large - 4', () => {
        getElementById.returns({
            offsetWidth: 200,
        });
        global.window.innerWidth = 1500;

        const showFeatureResult = true;
        const renderCard = sinon.spy();
        const wrapper = mount(<TypeaheadInput
            renderCard={renderCard}
            showFeatureResult={showFeatureResult}
            datasource={storyData}
            data={data}
            inputText="Shirt in Men"
            isFocused />);
        const instance = wrapper.instance();
        instance.setProductList(1, 'dept', 1);
        expect(renderCard.callCount).to.be.equal(4);
    });
});
