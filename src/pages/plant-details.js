import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

const plantDetails = ({data}) => {
  return (
    <Layout>
      <SEO title="Plant Listing" />
      <h1>Plant Detail</h1>
    </Layout>
  )
}

// results automagically passed to page component as 'data'
export const query = graphql`
  query {
    allPlantsJson(sort: {fields: title order: ASC})
    {
      edges {
        node {
          title
          slug
          price {
            plug
            four_in
          }
          availability {
            plug
            four_in
          }
        }
      }
    }
  }
`

export default plantDetails;
