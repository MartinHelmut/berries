import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';

// This is a workaround for the following bug:
// https://github.com/zeit/next.js/issues/3520
const globalStyle = {
    __html: `
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }
    body {
        padding: 0;
        margin: 0;
    }
`
};

export default class MyApp extends App {
    static async getInitialProps({ Component, router, ctx }) {
        if (Component.getInitialProps) {
            return await Component.getInitialProps(ctx);
        }

        return {};
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <Container>
                <Head>
                    <meta charSet="utf-8" />
                    <meta
                        name="viewport"
                        content="initial-scale=1.0, width=device-width"
                    />
                    <style dangerouslySetInnerHTML={globalStyle} />
                    <title>pick-your-berries.net</title>
                </Head>
                <Component {...pageProps} />
            </Container>
        );
    }
}
