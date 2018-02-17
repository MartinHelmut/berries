import React from 'react';

const Footer = ({ children }) => {
    return (
        <footer>
            <hr />
            <aside>{children}</aside>
        </footer>
    );
};

export default Footer;
