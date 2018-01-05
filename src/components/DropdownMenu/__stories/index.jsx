import React from 'react';
import DropdownMenu from '../DropdownMenu';
import { dropDownMenuData } from './mock';

const stories = [
    {
        name: 'Dropdown Menu',
        story: () => (
            <div>
                <DropdownMenu datasource={dropDownMenuData} />
            </div>
        ),
    },
];

export default stories;
