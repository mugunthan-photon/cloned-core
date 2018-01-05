import React from 'react';
import Image from '../Image';

const stories = [
    {
        name: 'Image',
        story: () => (
            <div style={{ maxWidth: '200px' }}>
                <Image
                    src="http://s7d9.scene7.com/is/image/JCPenney//DP1003201417030645M?$department_main$"
                    alt="Sample alt text"
                    automationId="test-automation-image"

                />
            </div>
        ),
    },
];

export default stories;
