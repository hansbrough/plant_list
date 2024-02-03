import React from "react";
import { graphql } from "gatsby";
//import Img from "gatsby-image";
import BackgroundImage from 'gatsby-background-image'

import Layout from "../components/layout";
import SEO from "../components/seo";

// results automagically passed to page component as 'data'
export const query = graphql`
  query {
    nurseryHero:file(name: { eq: "hmb_nursery_1" }) {
      childImageSharp {
        fluid(maxWidth: 1000, fit: COVER) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

const IndexPage = ({data}) => {
  return (
    <Layout pageName="home">
      <SEO title="Home" />
      <BackgroundImage
          Tag="section"
          className="hero-section"
          fluid={data.nurseryHero.childImageSharp.fluid}
          backgroundColor={`#040e18`}
      >
        <div className="hero-content">
          <h1 className="hero-title">Brough Plants</h1>
          <h2 className="hero-subtitle">Waterwise plants for California's Mediterranean climate.</h2>
        </div>
      </BackgroundImage>
    </Layout>
  )
}


export default IndexPage
