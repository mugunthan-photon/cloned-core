import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Rating from './Rating';

describe('<Rating />', () => {
    describe('Testing Rating for star shape', () => {
        let starRatingComp;

        beforeEach(() => {
            // Shallow Rendering component in before each to eliminate duplication
            starRatingComp = shallow(<Rating total={5} rating={3} size={10} space={30} shape={'star'} color={'#FFDF00'} automationId="test-automation-rating-1" />);
        });

        it('star rating component renders ', () => {
            expect(starRatingComp).to.exist;
        });

        it('Rating component should contain a SPAN component ', () => {
            expect(starRatingComp.find('SPAN')).to.exist;
        });
    });


    describe('circle rating component renders', () => {
        let circleRatingComp;

        beforeEach(() => {
            // Shallow Rendering component in before each to eliminate duplication
            circleRatingComp = shallow(<Rating total={5} rating={0} size={30} shape={'circle'} automationId="test-automation-rating-2" />);
        });

        it('Rating component should exist', () => {
            expect(circleRatingComp).to.exist;
        });

        it('Branch should exist', () => {
            expect(circleRatingComp).to.exist;
        });
    });

    describe('Testing for failing conditions', () => {
        let ratComp;

        beforeEach(() => {
            // Shallow Rendering component in before each to eliminate duplication
            ratComp = shallow(<Rating total={5} rating={-1} size={30} shape={'anything'} automationId="test-automation-rating-2" />);
        });
        it('Fail Condition test', () => {
            expect(ratComp).to.exist;
        });
    });
});
