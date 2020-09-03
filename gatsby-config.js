/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: 'Dwegstea',
    description: 'A tea blog where I review/appraise various loose leaf tea and tea shops',
    author: 'Jun Ming',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Dwegstea`,
        short_name: `Dwegstea`,
        start_url: `/`,
        lang: `en`,
        display: `standalone`,
        icon: `static/dwegsteaLogo.png`,
      }
    },
    `gatsby-plugin-styled-components`,
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/Layout.js`),
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `${process.env.CONTENTFUL_SPACE_ID}`,
        accessToken: `${process.env.CONTENTFUL_API_KEY}`,
      },
    },
    `gatsby-plugin-meta-redirect`
  ]
}
