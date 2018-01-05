import React from 'react';
import RadioButton from '../RadioButton';

const stories = [
    {
        name: 'RadioButton',
        story: () => (
            <div>
                <RadioButton id="radio1" name="test" value="Radio1" />
                <br />
                <RadioButton id="radio2" name="test" value="Radio2" />
                <br />
                <RadioButton id="radio3" name="test" value="Radio3" isChecked />
                <br />
                <RadioButton id="radio4" name="test" isDisabled value="Disabled" />
                <br />
                <RadioButton id="radio5" name="testdisabled" isDisabled value="Disabled Checked" isChecked />
                <br />
                <RadioButton id="radio6" name="test" type="Error" value="Error" />
            </div>
        ),
    },
];

export default stories;
