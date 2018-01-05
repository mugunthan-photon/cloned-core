import React from 'react';
import PerformanceHelper from '../PerformanceHelper';

const stories = [
    {
        name: 'PerformanceHelperTest',
        story: () => {
            const performanceHelper = new PerformanceHelper();

            return (
                <div>
                    <pre>
                        {JSON.stringify(performanceHelper.getMetrics())}
                    </pre>
                </div>
            );
        },
    },
];

export default stories;
