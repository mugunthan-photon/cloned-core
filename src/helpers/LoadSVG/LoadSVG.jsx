import React from 'react';
import styles from './LoadSVG.css';

/**
 * LoadSVG
 * resuable SVG sprite loader for yoda-core, yoda-site and microsite pages
 * @param svgs {array} - it expect array avg file path to load
 * @TODO: avoid using react-svg lib
 */
const LoadSVG = svgs => (
    <div className={styles.hide}>
        {svgs.svgPaths.map((svgPath, index) =>
            <span
                key={index.toString()} dangerouslySetInnerHTML={{ __html: svgPath }} // eslint-disable-line react/no-danger
            />,
        )}
    </div>
);

export default LoadSVG;
