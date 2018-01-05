import React from 'react';
import Rating from '../Rating';

export default [
    {
        name: 'Rating',
        story: () => (
            <div>
                <div>
                    <Rating total={5} rating={3} size={10} space={30} shape={'star'} color={'#FFDF00'} theme="starSvg" automationId="test-automation-rating-1" />
                </div>
                <div>
                    <Rating total={5} rating={4} size={30} shape={'circle'} theme="starSvg" automationId="test-automation-rating-2" />
                </div>
                <div>
                    <Rating theme="starIcon" total={5} rating={2} starSize="small" starColor="jcpRed" automationId="test-automation-rating-3" />
                </div>
                <div>
                    <Rating theme="starIcon" total={6} rating={3.2} starSize="medium" starColor="jcpBlue" automationId="test-automation-rating-3" />
                </div>
                <div>
                    <Rating theme="starIcon" total={5} rating={3.8} starSize="large" starColor="jcpTurquoise" automationId="test-automation-rating-3" />
                </div>
                <div>
                    <Rating theme="starIcon" total={5} rating={4.7} starSize="xLarge" starColor="jcpGreen" automationId="test-automation-rating-3" />
                </div>
                <div>
                    <Rating theme="starIcon" total={5} rating={4.7} shape={'circle'} starSize="xLarge" starColor="jcpGreen" automationId="test-automation-rating-3" />
                </div>
            </div>
        ),
    },
];
