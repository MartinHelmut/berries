import React from 'react';

import Container from '../components/container';
import Heading from '../components/heading';
import Footer from '../components/footer';
import Link from '../components/link';

const MainLayout = ({ children }) => (
    <Container>
        <Link
            to="/"
            title="Link to the berries home page, the place where home is"
        >
            <Heading>berries</Heading>
        </Link>
        <main>{children()}</main>
        <Footer>
            <Link
                to="/legal-notice"
                title="The legal notice page for the berries documentation"
            >
                legal notice
            </Link>
            {' | '}
            <Link
                to="/privacy-policy"
                title="Private policy page where everything is about cookies, without berries ..."
            >
                privacy policy
            </Link>
        </Footer>
    </Container>
);

export default MainLayout;
