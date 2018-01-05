import React from 'react';
import MessageBox from '../MessageBox';
import * as styles from './storyBookTheme.css';

const stories = [
    {
        name: 'MessageBox',
        story: () => (
            <div>
                <MessageBox />
                <h4>Page Level [The width will vary based on the resolutions] </h4>
                <div className={styles.pageLayout}>
                    <MessageBox type="success" level="page" title="Success">
                        This is the success Message.
                        This is the success Message.
                    </MessageBox>
                </div>
                <div className={styles.pageLayout}>
                    <MessageBox type="information" level="page" title="This is the Info Message." />
                </div>
                <div className={styles.pageLayout}>
                    <MessageBox type="warning" level="page" title="This is a Warning Message" />
                </div>
                <div className={styles.pageLayout}>
                    <MessageBox type="error" level="page" title="This is an Error Message" />
                </div>
                <h4>Section Level</h4>
                <MessageBox type="success" level="section" title="This is Success Message" />
                <MessageBox type="information" level="section" title="This is an Info Message" />
                <MessageBox type="warning" level="section" title="This is a Warning Message" />
                <MessageBox type="error" level="section" title="This is an Error Message" />
                <h4>Inline Level</h4>
                <MessageBox type="success" level="inline" title="This is Success Message" />
                <MessageBox type="information" level="inline" title="This is an Info Message" />
                <MessageBox type="warning" level="inline" title="This is a Warning Message" />
                <MessageBox type="error" level="inline" title="This is an Error Message" />
                <h4>No Close Button</h4>
                <MessageBox type="information" level="section" title="This is an Info Message No close button added" hasClose={false} />
            </div>
        ),
    },
];

export default stories;
