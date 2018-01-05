// Generic components for content
import React from 'react';

const Content = props => <div>{props.children}</div>;

Content.propTypes = {
    children: React.PropTypes.node,
};

Content.defaultProps = {
    children: {},
};

export default Content;
