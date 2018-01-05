// Generic components for Title
import React from 'react';

const Title = props => <div>{props.children}</div>;

Title.propTypes = {
    children: React.PropTypes.node,
};

Title.defaultProps = {
    children: {},
};

export default Title;
