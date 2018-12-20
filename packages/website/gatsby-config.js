module.exports = {
    siteMetadata: {
        siteUrl: 'https://pick-your-berries.net'
    },
    plugins: [
        {
            resolve: 'gatsby-plugin-typography',
            options: {
                pathToConfigModule: 'src/utils/typography.js',
                omitGoogleFont: true
            }
        },
        {
            resolve: 'gatsby-plugin-sitemap'
        },
        'gatsby-transformer-sharp',
        'gatsby-plugin-sharp',
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-remove-trailing-slashes',
        'gatsby-plugin-netlify',
        'gatsby-plugin-styled-components'
    ]
};
