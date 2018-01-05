import React from 'react';
import TypeaheadInput from '../TypeaheadInput';
import storyData from './mock';

export default [
    {
        name: 'Searching',
        story: () => (
            <div>
                <TypeaheadInput datasource={storyData} automationId="test-automation-search" inputText="sh" isFocused />
            </div>
         ),
    },
];
