import React, { useState } from "react";
import { graphql, Link, navigate } from "gatsby";
import Img from "gatsby-image";
import { useIdentityContext } from "react-netlify-identity-widget";
import { isBrowser } from "../utils/general";
import Layout from "../components/layout";
import SEO from "../components/seo";
import FormInputField from '../components/FormInputField/FormInputField';
import Button from '../components/Button';

// results automagically passed to page component as 'data'
export const query = graphql`
  query {
    nurseryHero:file(name: { eq: "greenhouse_bulbils" }) {
        childImageSharp {
          fixed(width:800) {
            ...GatsbyImageSharpFixed
          }
        }
      }
  }
`

const ResllerPage = ({data}) => {
  // redirect when user not logged in (TODO: use a router somehow?)
  const identity = useIdentityContext();
  const isLoggedIn = identity && identity.isLoggedIn;
  if(isBrowser && identity && !isLoggedIn) {
    navigate('/');
    return null;
  } else {
    return (
      <Layout pageName="reseller">
        <SEO title="Brough Plants Reseller Resources" />
        <h2>Reseller Resources</h2>

        <p>
          Download the <a href="/pdf/availability_pricing.pdf" download target="_blank">Latest Availability List with Pricing</a>.
        </p>

        <Img
            fixed={data.nurseryHero.childImageSharp.fixed}
            alt="Greenhouse Bulbils"
            className="aloe-regions-map"
          />





      </Layout>
    )
  }
}


export default ResllerPage
