import React from 'react';
import Input from '../Input';

const stories = [
    {
        name: 'Input',
        story: () => (
            <form>
                <h3>JCPenney Account</h3>
                <Input type="text" name="Customer" value="Customer" readOnly automationId="test-automation-customer" /><br />
                <Input type="text" name="firstname" placeholder="Firstname" ariaRequired required automationId="test-automation-firstname" />
                <Input type="text" name="lastname" placeholder="Lastname" ariaRequired required automationId="test-automation-lname" /><br />
                <Input type="email" name="email" placeholder="Email" automationId="test-automation-email" />
                <Input type="password" name="password" placeholder="Password" automationId="test-automation-pswd" /><br />
                <Input type="submit" value="Submit" /><br />
            </form>
        ),
    },
];

export default stories;
