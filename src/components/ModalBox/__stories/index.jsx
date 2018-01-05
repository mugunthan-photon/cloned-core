import React from 'react';
import ModalBox from '../ModalBox';

const stories = [
    {
        name: 'ModalBox',
        story: () => {
            const modalOpen = true;
            function close() {
            }
            return (
                <ModalBox showModal={modalOpen} onClose={close} automationId="test-automation-modal" defaultHeader title="Test Title" subTitle="subTitle" >
                        Nullam id dolor id nibh ultricies vehicula ut id elit. Donec ullamcorper nulla non metus auctor.
                </ModalBox>
            );
        },
    },
];

export default stories;
