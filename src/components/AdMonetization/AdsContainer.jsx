// Generic components for AdsContainer
import React from 'react';

const AdsContainer = props => <div id={props.id}/>;

AdsContainer.propTypes = {
    id: React.PropTypes.string.isRequired,
};

export default AdsContainer;
