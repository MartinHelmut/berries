import React from 'react';
import GatsbyLink from 'gatsby-link';

const Link = ({ children, to, title }) => {
    if (to && to[0] === '/') {
        return (
            <GatsbyLink to={to} title={title}>
                {children}
            </GatsbyLink>
        );
    }

    return (
        <a href={to} title={title}>
            {children}
        </a>
    );
};

export default Link;
