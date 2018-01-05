import React from 'react';

import { storiesOf } from '@kadira/storybook';
import { withKnobs } from '@kadira/storybook-addon-knobs';

import accordionStories from '../src/components/Accordion/__stories';
import tabStories from '../src/components/Tabs/__stories';
import carouselStories from '../src/components/Carousel/__stories';
import ratingStories from '../src/components/Rating/__stories';
import bannerStories from '../src/components/Banner/__stories';
import searchingStories from '../src/components/TypeaheadInput/__stories';
import dropDownMenuStories from '../src/components/DropdownMenu/__stories';
import breadCrumbStories from '../src/components/BreadCrumbs/__stories';
import visualNav from '../src/components/VisualNav/__stories';
import ImagemapBannerResponsive from '../src/components/ImagemapBannerResponsive/__stories';
import AdMonetization from '../src/components/AdMonetization/__stories';
import timerStories from '../src/components/Timer/__stories';
import sprite from '../src/assets/sprite.svg';
import { LoadSVG } from '../src/helpers';

const moleculesStories = storiesOf('Molecules', module);

moleculesStories.addDecorator(getStory => (
    <div>
        <LoadSVG svgPaths={[sprite]} />
        { getStory() }
    </div>
));
const addStories = (stories) => {
    stories.forEach((element) => {
        moleculesStories.addWithInfo(
            element.name,
            element.story,
            {
                inline: true,
                header: true,
            });
    }, this);
};

moleculesStories.addDecorator(withKnobs);

addStories(accordionStories);
addStories(tabStories);
addStories(breadCrumbStories);
addStories(carouselStories);
addStories(ratingStories);
addStories(bannerStories);
addStories(searchingStories);
addStories(dropDownMenuStories);
addStories(visualNav);
addStories(ImagemapBannerResponsive);
addStories(AdMonetization);
addStories(timerStories);
