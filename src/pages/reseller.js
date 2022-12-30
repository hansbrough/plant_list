import React from "react";
import { graphql, navigate } from "gatsby";
import Img from "gatsby-image";
import { useIdentityContext } from "react-netlify-identity-widget";
import { isBrowser } from "../utils/general";
import Layout from "../components/layout";
import SEO from "../components/seo";

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
  const identity = useIdentityContext();
  const roles = (identity && identity?.user?.app_metadata?.roles);
  //console.log("user roles:",roles);
  const isWholesaleCustomer = roles?.includes('nursery');//used to restrict "trades people" and others from seeing the wholesale prices
  const isTradesCustomer = roles?.includes('trades');
  const isLoggedIn = identity && identity.isLoggedIn;

  if(isBrowser && identity && !isLoggedIn) { // redirect client when not logged in.
    navigate('/');
    return null;
  } else {
    return (
      <Layout pageName="reseller">
        <SEO title="Brough Plants Reseller Resources" />
        <h2>Reseller Resources</h2>

        {isWholesaleCustomer &&
          (
            <p>
              <a href="/pdf/availability_wholesale_pricing.pdf" download target="_blank">Latest Plant Availability List with Wholesale Pricing</a>
            </p>
          )
        }
        {isTradesCustomer && !isWholesaleCustomer &&
          (
            <p>
              <a href="/pdf/availability_trade_pricing.pdf" download target="_blank">Latest Plant Availability List with Trade Pricing</a>
            </p>
          )
        }
        <p>
          <a href="/pdf/CA_Resellers_Form.pdf" download target="_blank">CA Reseller Form </a>
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
