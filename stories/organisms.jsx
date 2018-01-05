import { storiesOf } from '@kadira/storybook';
import { withKnobs } from '@kadira/storybook-addon-knobs';
import React from 'react';

import sprite from '../src/assets/sprite.svg';
import { LoadSVG } from '../src/helpers';

const organismsStories = storiesOf('Organisms', module);

organismsStories.addDecorator(getStory => (
    <div>
        <LoadSVG svgPaths={[sprite]} />
        { getStory() }
    </div>
));

const addStories = (stories) => {
    stories.forEach((element) => {
        organismsStories.addWithInfo(
            element.name,
            element.story,
            {
                inline: true,
                header: true,
            });
    }, this);
};
organismsStories.addDecorator(withKnobs);
