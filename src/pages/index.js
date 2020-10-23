import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";
import SEO from "../components/seo";

// results automagically passed to page component as 'data'
export const query = graphql`
  query {
    nurseryHero:file(name: { eq: "backyard-nursery" }) {
        childImageSharp {
          fixed(width:800) {
            ...GatsbyImageSharpFixed
          }
        }
      }
  }
`

const IndexPage = ({data}) => {
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Who we are</h1>
      <p>
        Brough Plants is a small grower of waterwise landscape plants suitable for California's Mediterranean climate.
        We specialize in Aloes and Agaves that can still thrive in a low water environment once established.
      </p>
      <Img
          fixed={data.nurseryHero.childImageSharp.fixed}
          alt="Plants growing in all day sun."
          className="aloe-regions-map"
        />


    </Layout>
  )
}


export default IndexPage
