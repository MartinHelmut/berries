import React from 'react';

const Heading = ({ order = 1, children }) => {
    const Component = `h${order}`;
    return <Component>{children}</Component>;
};

export default Heading;
