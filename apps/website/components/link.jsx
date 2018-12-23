import React from 'react';
import NextLink from 'next/link';

const Link = ({ children, to, title }) => {
    if (to && to[0] === '/') {
        return (
            <NextLink href={to}>
                <a title={title}>{children}</a>
            </NextLink>
        );
    }

    return (
        <a href={to} title={title}>
            {children}
        </a>
    );
};

export default Link;
