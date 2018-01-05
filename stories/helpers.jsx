import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { withKnobs } from '@kadira/storybook-addon-knobs';
import fontLoaderStories from '../src/helpers/FontLoader/__stories';
import scriptLoaderStories from '../src/helpers/ScriptLoader/__stories';
import performanceHelperStories from '../src/helpers/PerformanceHelper/__stories';
import localStorageStories from '../src/helpers/LocalStorage/__stories';
import PointCross from '../src/components/PointCross/__stories';

const helperStories = storiesOf('Helper', module);

const addStories = (stories) => {
    stories.forEach((element) => {
        helperStories.addWithInfo(
            element.name,
            element.story,
            {
                inline: true,
                header: true,
            });
    }, this);
};

helperStories.addDecorator(withKnobs);

addStories(fontLoaderStories);
addStories(scriptLoaderStories);
addStories(localStorageStories);
addStories(performanceHelperStories);
addStories(PointCross);
