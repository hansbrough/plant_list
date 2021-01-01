 /**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// gatsby node is run through node (not babel) and supports the es6 module syntax  'require' vs 'import'

/*
* Define schema for plant prices, availability and stock
* this lets gatsby determine types of unused fields
*/
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type PlantsJsonPrice implements Node {
      plug: Float
      two_in: Float
      three_in: Float
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
      two_in: String
      three_in: String
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
    type PlantsJsonStock implements Node {
      plug: Int
      two_in: Int
      three_in: Int
      four_in: Int
      six_in: Int
      eight_in: Int
      one_ga: Int
      two_ga: Int
      five_ga: Int
      seven_ga: Int
      ten_ga: Int
      fifteen_ga: Int
    }
  `
  createTypes(typeDefs)
}



exports.createPages = async ({ actions: { createPage }, graphql }) => {
  // All plants
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
  // plants filtered by genus
  const genusResults = await graphql(`
    {
      all:allPlantsJson(sort: {fields: title order: ASC}) {
        totalCount
        edges {
          node {
            slug
            title
            price {
              plug
              two_in
              three_in
              four_in
              six_in
              eight_in
              one_ga
              two_ga
              five_ga
              seven_ga
              ten_ga
              fifteen_ga
            }
            availability {
              plug
              two_in
              three_in
              four_in
              six_in
              eight_in
              one_ga
              two_ga
              five_ga
              seven_ga
              ten_ga
              fifteen_ga
            }
          }
        }
      }
      aloe:allPlantsJson(filter: {genus: {eq: "aloe"}}, sort: {fields: title order: ASC}) {
        totalCount
        edges {
          node {
            slug
            title
            price {
              plug
              two_in
              three_in
              four_in
              six_in
              eight_in
              one_ga
              two_ga
              five_ga
              seven_ga
              ten_ga
              fifteen_ga
            }
            availability {
              plug
              two_in
              three_in
              four_in
              six_in
              eight_in
              one_ga
              two_ga
              five_ga
              seven_ga
              ten_ga
              fifteen_ga
            }
          }
        }
      }
      agave:allPlantsJson(filter: {genus: {eq: "agave"}}, sort: {fields: title order: ASC}) {
        totalCount
        edges {
          node {
            slug
            title
            price {
              plug
              two_in
              three_in
              four_in
              six_in
              eight_in
              one_ga
              two_ga
              five_ga
              seven_ga
              ten_ga
              fifteen_ga
            }
            availability {
              plug
              two_in
              three_in
              four_in
              six_in
              eight_in
              one_ga
              two_ga
              five_ga
              seven_ga
              ten_ga
              fifteen_ga
            }
          }
        }
      }
      other:allPlantsJson(filter: {genus: {nin: ["aloe","agave"]}}, sort: {fields: title order: ASC}) {
        totalCount
        edges {
          node {
            slug
            title
            price {
              plug
              two_in
              three_in
              four_in
              six_in
              eight_in
              one_ga
              two_ga
              five_ga
              seven_ga
              ten_ga
              fifteen_ga
            }
            availability {
              plug
              two_in
              three_in
              four_in
              six_in
              eight_in
              one_ga
              two_ga
              five_ga
              seven_ga
              ten_ga
              fifteen_ga
            }
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

  // create 'index' entry for list of all plants
  createPage({
    path: `/plant-listing/`,
    component: require.resolve("./src/templates/plant-filtered-listing.js"),
    context: {
      genus_name: 'all',
      totalCount: genusResults.data['all'].totalCount,
      edges: genusResults.data['all'].edges,
      image_hero_regex: `/[a-z]*-hero/`
    },
  });

  // create plant genus specific pages that list filtered results
  const plantGenusNames = Object.keys(genusResults.data);
  plantGenusNames.forEach(genusName => {
    const genus = genusResults.data[genusName];
    createPage({
      path: `/plant-listing/${genusName}/`,
      component: require.resolve("./src/templates/plant-filtered-listing.js"),
      context: {
        genus_name: genusName,
        totalCount: genus.totalCount,
        edges: genus.edges,
        image_hero_regex: `/[a-z]*-hero/`
      },
    })
  });
}
