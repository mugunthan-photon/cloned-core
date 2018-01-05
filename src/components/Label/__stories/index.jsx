import React from 'react';
import Label from '../Label';

const labelClass = 'default';
const stories = [
    {
        name: 'Label',
        story: () => (
            <h1>Label <Label automationId="test-automation-label" className={labelClass}>Label</Label></h1>
        ),
    },
];

export default stories;
