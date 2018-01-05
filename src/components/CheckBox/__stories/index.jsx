import React from 'react';
import CheckBox from '../CheckBox';

const config = {
    defaultChecked: true,
    id: 'check1',
    name: 'test',
};

const config2 = {
    defaultChecked: true,
    id: 'check2',
    name: 'test2',
};

const disabledConfig = {
    disabled: true,
    value: '2',
    name: 'test2',
    id: 'check2',
    label: 'test',
};

const stories = [
    {
        name: 'CheckBox',
        story: () => (
            <div>
                <CheckBox config={config} enableFastClick/>
                <br />
                <CheckBox config={config2}/>
                <br />
                <CheckBox config={disabledConfig}/>
            </div>),
    },
];

export default stories;
