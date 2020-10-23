module.exports = {
  siteMetadata: {
    title: `Brough Plants`,
    description: `Wholesale Plant List`,
    author: `@broughplants`,
    siteUrl: `https://www.broughplants.com`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-154920694-1",
        head: true
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/data/`,
        ignore: [`**/\.*`], // ignore files starting with a dot
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-react-helmet-canonical-urls`,
      options: {
        siteUrl: `https://www.gardenaloes.com`,
      },
    },
    `gatsby-transformer-json`,

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/aloe-broomii-hero.jpg`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: "gatsby-plugin-excerpts",
      options: {
        sources: {
          default: {
            type: "htmlQuery",
            sourceField: "flowering",
            excerptSelector: "html > *",
            ignoreSelector: "img, .gatsby-highlight",
            stripSelector: "a",
            elementReplacements: [
              {
                selector: "h6",
                replaceWith: "strong"
              },
              {
                selector: "h5",
                replaceWith: "h6"
              },
              {
                selector: "h4",
                replaceWith: "h5"
              },
              {
                selector: "h3",
                replaceWith: "h4"
              },
              {
                selector: "h2",
                replaceWith: "h3"
              },
            ],
            truncate: {
                length: 80,
                byWords: true,
                ellipsis: "…"
            },
          }
        },
        sourceSets: {
            markdownHtml: [
                "snippetBlocks",
                "default"
            ]
        },
        excerpts: {
            snippet: {
                type: "html",
                nodeTypeSourceSet: {
                    MarkdownRemark: "markdownHtml"
                }
            }
        }
    },
  }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
