import React from 'react';
import List from '../List';

const stories = [
    {
        name: 'List',
        story: () => {
            const listArr = [
                {
                    text: 'Item 1',
                    id: 1,
                    key: 1,
                },
                {
                    text: 'Item 2',
                    originalPrice: '44',
                    id: 2,
                    key: 2,
                },
                {
                    text: 'Item 3',
                    originalPrice: '44',
                    id: 3,
                    key: 3,
                },
            ];

            const listItemRenderer = dataItem => <span key={dataItem.id}>{dataItem.text}</span>;

            return (
                <List datasource={listArr} childRenderer={listItemRenderer} automationId="test-automation-carousel-content" />
            );
        },
    },
];

export default stories;
