import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { describe, it } from 'mocha';
import React from 'react';
import Timer, { TimerHelper } from './Timer';


/**
 * TODO :: Optimizing code and test cases will be done here
 */

const finishTime = new Date(new Date());
finishTime.setHours(new Date().getHours() + 1);

const finishTime1 = new Date(new Date());
finishTime1.setHours(new Date().getHours() + 11);

const timeRemaining = TimerHelper.getTimeRemaining(finishTime);
const timeRemaining1 = TimerHelper.getTimeRemaining(finishTime1);

describe('<Timer and its subcomponents /> ', () => {
    let wrapper;
    const clock = sinon.useFakeTimers();

    /**
     * Timer Test Cases in here
     */
    describe('<Timer />', () => {
        it('Timer component base condition exist ', () => {
            const callbackHandler = sinon.spy();
            sinon.spy(Timer.prototype, 'componentDidMount');
            wrapper = mount(
                <Timer
                    initialTimeRemaining={
                        (timeRemaining.total && timeRemaining.total > 0) ? timeRemaining.total : 0}
                    tickCallback={callbackHandler} suffix={false} />);
            expect(wrapper).to.exist;
            expect(Timer.prototype.componentDidMount).to.have.property('callCount', 1);
            clock.tick(1000);
            Timer.prototype.componentDidMount.restore();
            wrapper.instance().tick();
            wrapper.unmount();
        });

        it('Timer with minus value and callback', () => {
            const callBack = sinon.spy();
            const wrapper1 = mount(
                <Timer
                    tickCallback={callBack}
                    initialTimeRemaining={1} completeCallback={callBack} />);
            expect(wrapper1).to.exist;
            wrapper1.update();
            clock.tick(1000);
        });

        it('Timer with minus value and no callback', () => {
            const callBack = sinon.spy();
            const wrapper1 = mount(
                <Timer
                    removeZeros
                    tickCallback={callBack}
                    initialTimeRemaining={1} />);
            expect(wrapper1).to.exist;
            wrapper1.update();
            clock.tick(100);
        });

        it('Timer with No Props', () => {
            const wrapper1 = mount(
                <Timer />);
            expect(wrapper1).to.exist;
            clock.tick(100);
        });

        it('Additional Props callback triggered', () => {
            const endDate = new Date();

            // add a day
            endDate.setDate(endDate.getDate() + 1);
            const wrapper1 = mount(
                <Timer
                    endTime={endDate}
                    removeZeros
                    text="off"
                    initialTimeRemaining={
                        (timeRemaining.total && timeRemaining.total > 0) ? timeRemaining.total : 0}
                    />);
            expect(wrapper1).to.exist;
            clock.tick(1000);
        });

        it('Passing end Time only', () => {
            const endDate = new Date();

            // add a day
            endDate.setDate(endDate.getDate() + 1);
            const wrapper1 = mount(
                <Timer
                    endTime={endDate}
                    removeZeros
                    text="off"
                    />);
            expect(wrapper1).to.exist;
            clock.tick(1000);
        });

        it('Timer with more than 24 hours', () => {
            sinon.spy(Timer.prototype, 'componentDidMount');
            const callbackHandler = sinon.spy();
            const endDate = new Date();

            // add a day
            endDate.setDate(endDate.getDate() + 1);
            wrapper = mount(
                <Timer
                    tickCallback={callbackHandler}
                    completeCallback={callbackHandler}
                    endTime={endDate}
                    digitSplit
                    animate
                    colorConfig={{
                        textColor: '#fff',
                        suffixColor: '#fff',
                        digitBoxbgColor: '#fff',
                    }}
                    initialTimeRemaining={
                        (timeRemaining1.total && timeRemaining1.total > 0) ? timeRemaining1.total : 0} />);
            expect(wrapper).to.exist;
            expect(Timer.prototype.componentDidMount).to.have.property('callCount', 1);
            clock.tick(1000);
            Timer.prototype.componentDidMount.restore();
            wrapper.instance().tick();
            clock.restore();
            wrapper.unmount();
        });


        it('Timer without animate', () => {
            sinon.spy(Timer.prototype, 'componentDidMount');
            const callbackHandler = sinon.spy();
            const endDate = new Date();

            // add a day
            endDate.setDate(endDate.getDate() + 1);
            wrapper = mount(
                <Timer
                    tickCallback={callbackHandler}
                    completeCallback={callbackHandler}
                    endTime={endDate}
                    digitSplit
                    animate={false}
                    colorConfig={{
                        textColor: '#fff',
                        suffixColor: '#fff',
                        digitBoxbgColor: '#fff',
                    }}
                    initialTimeRemaining={
                        (timeRemaining1.total && timeRemaining1.total > 0) ? timeRemaining1.total : 0} />);
            expect(wrapper).to.exist;
            expect(Timer.prototype.componentDidMount).to.have.property('callCount', 1);
            clock.tick(1000);
            Timer.prototype.componentDidMount.restore();
            wrapper.instance().tick();
            clock.restore();
            wrapper.unmount();
        });
    });

    /**
     * Timer Helper Test Cases in here
     */
    describe('TimerHelper', () => {
        it('TimerHelper to fetch the remaining time between two dates', () => {
            const startdate = 'Sun Aug 13 2017 02:00:00 PM';
            const enddate = 'Sun Aug 14 2017 02:00:00 PM';
            const remainingTime = TimerHelper.getTimeRemaining(enddate, startdate);
            // assert in here
            console.log(remainingTime);
        });

        it('TimerHelper given already an expired date', () => {
            const remainingTime = TimerHelper.getTimeRemaining('Mon Sep 13 2017 04:15:00 AM CDT');
            // assert in here
            console.log(remainingTime);
            TimerHelper.getFormattedTime(10000);
        });
    });
});

