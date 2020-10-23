 /**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// gatsby node is run through node (not babel) and supports the es6 module syntax  'require' vs 'import'

/*
* Define schema for plant prices
* this lets gatsby determine types of unused fields
*/
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type PlantsJsonPrice implements Node {
      plug: Float
      four_in: Float
      six_in: Float
      eight_in: Float
      one_ga: Float
      two_ga: Float
      five_ga: Float
      seven_ga: Float
      ten_ga: Float
      fifteen_ga: Float
    }
    type PlantsJsonAvailability implements Node {
      plug: String
      four_in: String
      six_in: String
      eight_in: String
      one_ga: String
      two_ga: String
      five_ga: String
      seven_ga: String
      ten_ga: String
      fifteen_ga: String
    }
  `
  createTypes(typeDefs)
}

exports.createPages = async ({ actions: { createPage }, graphql }) => {
  const plantResults = await graphql(`
    {
      allPlantsJson {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

// extra context 'regex' props created here so they can be used as filters in template queries.
plantResults.data.allPlantsJson.edges.forEach(edge => {
  const plant = edge.node
  createPage({
    path: `/${plant.slug}/`,
    component: require.resolve("./src/templates/plant-profile.js"),
    context: {
      slug: plant.slug,
      image_regex: `/${plant.slug}/`,
      image_hero_regex: `/${plant.slug}-hero/`
    },
  })
})
}
