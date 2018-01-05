import React from 'react';
import S7Image from '../S7Image';

const stories = [
    {
        name: 'S7Image',
        story: () => (
            <div style={{ maxWidth: '200px' }}>
                <S7Image
                    src="http://s7d9.scene7.com/is/image/JCPenney//DP1003201417030645M.tif"
                    alt="Sample alt text"
                    recipe="$department_main$"
                    automationId="test-automation-s7Image"
                    animate
                />
                <S7Image
                    src="https://s7d9.scene7.com/is/image/JCPenney/1AE43F1_1AC2228_736-7190_AMBER_JPG"
                    alt="Sample alt text"
                    recipe="$department_main$"
                    automationId="test-automation-s7Image"
                    animate
                />
            </div>
        ),
    },
];

export default stories;
