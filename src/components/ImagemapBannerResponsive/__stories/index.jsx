import React from 'react';
import ImagemapBannerResponsive from '../ImagemapBannerResponsive';
import imagemapAreaMockData from './mock';

const stories = [
    {
        name: 'ImagemapBannerResponsive',
        story: () => (
            <ImagemapBannerResponsive
                automationId="test-automation-banner-responsive"
                imageUrl="http://m.jcpenney.com/mobile//images/pg00001_m550007_70300034.jpg"
                imagemapArea={imagemapAreaMockData}
                imageAltText="blush"
            />
        ),
    },
];

export default stories;
