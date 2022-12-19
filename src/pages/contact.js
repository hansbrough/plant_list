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
    nurseryHero:file(name: { eq: "agave-red-margin-landscape" }) {
        childImageSharp {
          fixed(width:800) {
            ...GatsbyImageSharpFixed
          }
        }
      }
  }
`

const ContactPage = ({data}) => {
  return (
    <Layout>
      <SEO title="Contact" />
      <h1>Contact Brough Plants</h1>
      <p>If you would like to place an order or ask a question - reach out by phone or email:</p>
      <p>
        <span><b>Phone</b> (650)-218-4172</span>
      </p>
      <p>
        <span><b>Email</b> hans@dryoasisgardening.com</span>
      </p>
      <p>
        <span><b>CA Nursery License</b> C3194</span>
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
