import React from 'react';
import Button from '../Button';
import Icon from '../../Icon/Icon';
import * as styles from './storyBookTheme.css';

const stories = [
    {
        name: 'Button',
        story: () => (
            <div className={styles.btnStories}>
                <div>
                    <h4>Primary and Large</h4>
                    <Button type="button" automationId="test-automation-btn-0" buttonType="Primary" size="Lg">Primary</Button>
                    <Button automationId="test-automation-btn-1" buttonType="Primary" type="submit" size="Lg">Submit</Button>
                    <Button type="button" automationId="test-automation-btn-0" buttonType="Primary" isDisabled size="Lg">Disabled</Button>
                    <br /><br />
                    <p>Button with no size mentioned changes the size based on the resolution</p>
                    <Button automationId="test-automation-btn-1" buttonType="Primary" type="button">Button</Button>
                </div>
                <br />
                <div>
                    <h4>Secondary and Medium</h4>
                    <Button type="button" automationId="test-automation-btn-0" buttonType="Secondary" size="Md">Secondary</Button>
                    <Button automationId="test-automation-btn-1" buttonType="Secondary" type="submit" size="Md">Submit</Button>
                    <Button type="button" automationId="test-automation-btn-0" buttonType="Secondary" isDisabled size="Md">Disabled</Button>
                    <br />
                    <br />
                    <p>Button with no size mentioned changes the size based on the resolution</p>
                    <Button automationId="test-automation-btn-1" buttonType="Secondary" type="button">Button</Button>
                </div>
                <br />
                <div>
                    <h4>Tertiary and Small</h4>
                    <Button type="button" automationId="test-automation-btn-0" buttonType="Tertiary" size="Sm">Tertiary</Button>
                    <Button automationId="test-automation-btn-1" buttonType="Tertiary" type="submit" size="Sm">Submit</Button>
                    <Button type="button" automationId="test-automation-btn-0" buttonType="Tertiary" isDisabled size="Sm">Disabled</Button>
                    <br />
                    <br />
                    <p>Button with no size mentioned changes the size based on the resolution</p>
                    <Button automationId="test-automation-btn-1" buttonType="Tertiary" type="submit">Button</Button>
                </div>
                <br />
                <div>
                    <h4>Text Button</h4>
                    <Button type="button" automationId="test-automation-btn-0" buttonType="Text" size="Lg">Text</Button>
                    <Button type="button" automationId="test-automation-btn-0" buttonType="Text" size="Md">Text</Button>
                    <Button type="button" automationId="test-automation-btn-0" buttonType="Text" size="Sm">Text</Button>
                    <Button type="button" automationId="test-automation-btn-0" buttonType="Text" isDisabled size="Lg">Disabled</Button>
                    <br />
                    <br />
                    <p>Button with no size mentioned changes the size based on the resolution</p>
                    <Button automationId="test-automation-btn-1" buttonType="Text" type="submit">Text</Button>
                </div>
                <br />
                <div>
                    <h4>Link Button</h4>
                    <Button type="button" automationId="test-automation-btn-0" buttonType="Link" size="Lg">Link</Button>
                    <Button automationId="test-automation-btn-1" buttonType="Link" type="submit" size="Md">Submit</Button>
                    <Button type="button" automationId="test-automation-btn-0" buttonType="Link" size="Sm">Link</Button>
                    <Button type="button" automationId="test-automation-btn-0" buttonType="Link" isDisabled size="Lg">Disabled</Button>
                    <br />
                    <br />
                    <p>Button with no size mentioned changes the size based on the resolution</p>
                    <Button automationId="test-automation-btn-1" buttonType="Link" type="submit">Link</Button>
                </div>
                <br />
                <div>
                    <h4>Button with Icon and Icon Button</h4>
                    <Button type="button" automationId="test-automation-btn-0" buttonType="Secondary" size="Lg" className="iconBtn">
                        <Icon iconType="svg" automationId="test-automation-icon" width="35px" height="35px" viewBox="0 0 35 35" name="heart-line" pathClassName={styles.iconPath} className="btnIcon" /> Save for Later
                    </Button>
                    <Button type="button" automationId="test-automation-btn-0" buttonType="Secondary" size="Lg" className="iconBtn">
                        <Icon iconType="svg" automationId="test-automation-icon" width="35px" height="35px" viewBox="0 0 35 35" name="settings" pathClassName={styles.iconPath} className="btnIcon" />
                    </Button>
                    <Button type="button" automationId="test-automation-btn-0" buttonType="Tertiary" size="Lg" className="iconBtn">
                        <Icon iconType="svg" automationId="test-automation-icon" width="35px" height="35px" viewBox="0 0 35 35" name="account-fill" pathClassName={styles.iconPath} className="btnIcon" />
                    </Button>
                </div>

                <div>
                    <h4>Button with Ellipsis</h4>
                    <Button type="button" automationId="test-automation-btn-0" buttonType="Secondary" size="Lg" className={styles.customBtn} ellipsis>
                        <Icon
                            iconType="svg" automationId="test-automation-icon"
                            width="35px" height="35px" viewBox="0 0 35 35"
                            name="heart-line" pathClassName={styles.iconPath} className="btnIcon" />
                        Save for Later Save for LaterSave for LaterSave for LaterSave for Later
                        </Button>
                </div>


            </div>
        ),
    },
];

export default stories;
