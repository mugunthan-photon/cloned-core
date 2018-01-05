import React from 'react';
import Timer from '../Timer';
import * as styles from './storyBookTheme.css';

const finishTime = new Date(new Date());
finishTime.setHours(new Date().getHours() + 12);

const finishTime1 = new Date(new Date());
finishTime1.setHours(new Date().getHours() + 4);

const finTime = new Date(new Date());
finTime.setSeconds(new Date().getSeconds() + 15);


// const timeRemaining = TimerHelper.getTimeRemaining(finishTime);
// const timeRemaining1 = TimerHelper.getTimeRemaining(finishTime1);
// const timeRemaining2 = TimerHelper.getTimeRemaining('Thu Sep 14 2017 06:15:00 AM CDT');


const endTime = 'Tue Sep 19 2017 06:20:00 AM CDT';

// const finishTime = new Date(new Date());
// finishTime.setHours(new Date().getHours() + 1);

// // 'Sun Aug 13 2017 02:00:00 PM'

// const timeRemaining = getTimeRemaining(finishTime);

const textColor = { color: '#b40', fontFamily: 'monospace' };

const myTheme = {
    timerContainerClass: styles.timerContainer,
    timerWrapperClass: styles.timer,
    timerListItemClass: styles.timerListItem,
    timerNumberClass: styles.timerNumber,
    timerTextClass: styles.timerText,
    timerSuffixClass: styles.timerListItem,
};


const myTheme1 = {
    timerContainerClass: styles.timerContainers,
    timerWrapperClass: styles.timer,
    timerListItemClass: styles.timerListItem,
    timerNumberClass: styles.timerNumber,
    timerTextClass: styles.timerText,
    timerSuffixClass: styles.timerListItem,
    timerDigitClass: styles.timerDigit,
    timerAnimateClass: styles.timerDigitAnimate,
};

const stories = [
    {
        name: 'Timer',
        story: () => (
            <div>
                <div>
                    <h4> <i><u>Timer With Text</u></i> </h4>
                    <Timer
                        endTime={endTime}
                        text="on" className={styles.timerBlock} />

                    <br />

                    <h4> <i><u>Timer without Text</u></i> </h4>
                    <Timer
                        endTime={finishTime1}
                        text="off" />

                    <br />
                    <h4> <i><u>Timer With Zeros Removed</u></i> </h4>
                    <Timer
                        endTime={finTime}
                        removeZeros
                        completeCallback />
                </div>
                <br />
                <h4> <i><u>Adding color to the text via the container / parent element</u></i> </h4>
                <div style={textColor}>
                    <Timer
                        endTime={finishTime} />
                </div>

                <br />
                <h4> <i><u>Timer With No Suffix</u></i> </h4>
                <div style={textColor}>
                    <Timer
                        endTime={finishTime}
                        suffix={false} />
                </div>


                <br />
                <h4> <i><u>Timer With Text Configured</u></i> </h4>
                <div style={textColor}>
                    <Timer
                        timerTextConfig={{
                            h: 'hrs',
                            m: 'min',
                            s: 'sec',
                        }}
                        endTime={finishTime}
                        />
                </div>

                <br />
                <h4> <i><u>Timer that uses themeConfig</u></i> </h4>
                <div style={{ color: '#cc0000', display: 'inline-block' }}>
                    <div style={{ display: 'inline-block', verticalAlign: 'top' }}> ends in </div>
                    <div style={{ marginLeft: '4px', display: 'inline-block' }}>
                        <Timer
                            themeConfig={myTheme}
                            suffix={false}
                            endTime={finishTime}
                            />
                    </div>
                </div>

                <br />
                <h4> <i><u>Timer that uses themeConfig and colorConfiguration</u></i> </h4>
                <div style={{ color: '#000', display: 'inline-block', backgroundColor: '#ffefd5', width: '100%' }}>
                    <div style={{ color: '#db7092', display: 'inline-block', fontSize: '40px', width: '70%', verticalAlign: 'top', textAlign: 'right' }}> HURRY COUPON CODE 48GOSHOP ENDS IN </div>
                    <div style={{ marginLeft: '4px', display: 'inline-block', textAlign: 'center', margin: '0 auto', width: '30%', color: '#FFF' }}>
                        <Timer
                            themeConfig={myTheme1}
                            colorConfig={{
                                textColor: '#db7092',
                                suffixColor: '#db7092',
                                digitBoxbgColor: '#db7092',
                            }}
                            digitSplit
                            endTime={finishTime}
                            />
                    </div>
                </div>

                <br />
                <br />
                <h4>
                    <i><u>Timer that uses themeConfig, digit split ,colorConfiguration with Animation behavior</u></i>
                </h4>
                <div style={{ color: '#000', display: 'inline-block', backgroundColor: '#000', width: '100%' }}>
                    <div style={{ color: '#fff', display: 'inline-block', fontSize: '40px', width: '70%', verticalAlign: 'top', textAlign: 'right' }}> HURRY COUPON CODE 48GOSHOP ENDS IN </div>
                    <div style={{ marginLeft: '4px', display: 'inline-block', textAlign: 'center', margin: '0 auto', width: '30%', color: '#fff' }}>
                        <Timer
                            themeConfig={myTheme1}
                            colorConfig={{
                                textColor: '#d02518',
                                suffixColor: '#d02518',
                                digitBoxbgColor: '#d02518',
                            }}
                            digitSplit
                            endTime={finishTime}
                            animate
                            />
                    </div>
                </div>
            </div>
        ),
    },
];

export default stories;
