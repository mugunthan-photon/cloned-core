import React from 'react';
import SocialShare from '../SocialShare';

const stories = [
    {
        name: 'SocialShare',
        story: () => (
            <SocialShare automationId="test-automation-social" iconClass="class1 class2" socialShareIcons={['FACEBOOK', 'TWITTER', 'GOOGLEPLUS', 'PINTEREST', 'YOUTUBE', 'BLOG']} />
        ),
    },
];

export default stories;
