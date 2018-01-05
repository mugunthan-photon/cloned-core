import React from 'react';
import { DFPMonetization, ADSenseSearch, AdsContainer } from '../AdMonetization';


// Passing sample
const adBlockConfig = {
    width: '100%',
    number: 3,
};

const stories = [
    {
        name: 'AdMonetization',
        story: () => (
            <div>
                <div>
                    <DFPMonetization id="div-gpt-ad-jcpenney_homepage-2" width={160} height={600} adslot="/5705/bv.jcpenney/homepage" pos="right" />
                </div>
                <br />
                <div>
                    <DFPMonetization id="div-gpt-ad-jcpenney_homepage-3" width={728} height={90} adslot="/5705/bv.jcpenney/homepage" pos="bottom" />
                </div>
                <br />
                <br />
                <div>
                    <ADSenseSearch id="adContainer" query="Levis" themeConfig={adBlockConfig} isAdTest />
                </div>
                <div>
                    <AdsContainer id="uniqueId" />
                </div>

            </div>
        ),
    },
];
export default stories;
