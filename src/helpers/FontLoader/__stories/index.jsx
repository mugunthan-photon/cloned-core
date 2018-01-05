import React from 'react';
import FontLoader from '../FontLoader';
import styles from './FontLoader.css';

const fontsList = [{ fontname: 'Montserrat', weight: '400', style: 'normal' },
                   { fontname: 'Montserrat', weight: '700', style: 'normal' },
                   { fontname: 'Open Sans', weight: '400', style: 'normal' },
                   { fontname: 'Open Sans', weight: '700', style: 'normal' },
                   { fontname: 'Open Sans', weight: '400', style: 'italic' }];

new FontLoader().callToLoadFonts(fontsList, styles);

const stories = [
    {
        name: 'FontLoader',
        story: () => (
            <div>
                <div style={{ maxWidth: '500px' }}>
                    <h3>Lorem Ipsum</h3>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industrys standard dummy text ever since
                    the 1500s, when an unknown printer took a galley of type and
                    scrambled it to make a type specimen book.
                    It has survived not only five centuries, but also the leap into electronic typesetting,
                    remaining essentially unchanged.
                </div>
            </div>

        ),
    },
];

export default stories;
