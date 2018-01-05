import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { withKnobs } from '@kadira/storybook-addon-knobs';
import imageStories from '../src/components/Image/__stories';
import s7ImageStories from '../src/components/S7Image/__stories';
import checkbox from '../src/components/CheckBox/__stories';
import listStories from '../src/components/List/__stories';
import labelStories from '../src/components/Label/__stories';
import buttonStories from '../src/components/Button/__stories';
import iconStories from '../src/components/Icon/__stories';
import socialIconStories from '../src/components/SocialShare/__stories';
import inputStories from '../src/components/Input/__stories';
import loaderStories from '../src/components/Loader/__stories';
import modalStories from '../src/components/ModalBox/__stories';
import radioButtonStories from '../src/components/RadioButton/__stories';
import messageBoxStories from '../src/components/MessageBox/__stories';
import YodaButtonSwitch from '../src/components/YodaButtonSwitch/__stories';
import YodaStaticSearch from '../src/components/YodaStaticSearch/__stories';
import sprite from '../src/assets/sprite.svg';
import { LoadSVG } from '../src/helpers';

const atomStories = storiesOf('Atoms', module);
atomStories.addDecorator(getStory => (
    <div>
        <LoadSVG svgPaths={[sprite]} />
        { getStory() }
    </div>
));

//  const atomStories = storiesOf('Atoms', module);
atomStories.addDecorator(withKnobs);

const addStories = (stories) => {
    stories.forEach((element) => {
        atomStories.addWithInfo(
            element.name,
            element.story,
            {
                inline: true,
                header: true,
            });
    }, this);
};

addStories(imageStories);
addStories(s7ImageStories);
addStories(listStories);
addStories(labelStories);
addStories(inputStories);
addStories(buttonStories);
addStories(iconStories);
addStories(socialIconStories);
addStories(loaderStories);
addStories(modalStories);
addStories(radioButtonStories);
addStories(checkbox);
addStories(messageBoxStories);
addStories(YodaStaticSearch);
addStories(YodaButtonSwitch);
