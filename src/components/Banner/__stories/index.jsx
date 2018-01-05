import React from 'react';
import Banner from '../Banner';

const stories = [
    {
        name: 'Banner',
        story: () => (
            <Banner automationId="test-automation-banner-0" href="http://m.jcpenney.com/jsp/rewards/rewardsHome.jsp" bannerImageUrl="http://m.jcpenney.com/mobile/images/pg00001_m550007_47100016.gif" altText="Banner Rewards" target="_blank" ariaLabel="rewards page link" />
        ),
    },
];

export default stories;
