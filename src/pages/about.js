import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";
import SEO from "../components/seo";
//= ==== Style ===== //
//import { FontAwesomeIcon } from 'react-fontawesome';
//import { faPhone } from '@fortawesome/free-solid-svg-icons';

// results automagically passed to page component as 'data'
export const query = graphql`
  query {
    nurseryHero:file(name: { eq: "IMG_6169" }) {
        childImageSharp {
          fixed(height:200) {
            ...GatsbyImageSharpFixed
          }
        }
      }
  }
`

const ContactPage = ({data}) => {
  return (
    <Layout pageName="about">
      <SEO title="Contact" />
      <h1>About</h1>
      <p>
        At one time I was a young Landscape Architecture graduate with thoughts of entering the business but life took me on a detour. However - over the last several years I've dived headlong into landscape succulents like aloes, agaves and cacti. These plants do well given our plant zone here on the SF mid-peninsula. There's some intersection of practicality, architectural form, beauty (and oddness) that's kept me coming back as a gardener, designer and more often now as a collector. When selling a plant we also try growing it here in our Northern California garden. This means the test plants are subject to excessive heat at times, rainstorms at other times, occasionally to near freezing temps, deer, gophers, ants, and what ever else nature throws our way.
      </p>

      <Img
          fixed={data.nurseryHero.childImageSharp.fixed}
          alt="Plants growing in all day sun."
          className="aloe-regions-map"
        />
    </Layout>
  )
}


export default ContactPage
