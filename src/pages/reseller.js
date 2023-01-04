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
  const hasNoRoll = !roles?.length;
  const isLoggedIn = identity && identity.isLoggedIn;
  //console.log("hasNoRoll:",hasNoRoll)

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
            <>
              <p>
                Welcome! We offer wholesale pricing on all plants to licensed nurseries with a CA sellers permit.
                If you have not already be sure to fill out and submit the CA reseller form below.
              </p>
              <p>
                <a href="/pdf/availability_wholesale_pricing.pdf" download target="_blank">Latest Plant Availability List with Wholesale Pricing</a>
              </p>
              <p>
                <a href="/pdf/CA_Resellers_Form.pdf" download target="_blank">CA Reseller Form </a>
              </p>
            </>
          )
        }
        {isTradesCustomer && !isWholesaleCustomer &&
          (
            <>
              <p>Welcome! We offer a 15% trade discount on all plants to landscape professionals.</p>
              <p>
                <a href="/pdf/availability_trade_pricing.pdf" download target="_blank">Latest Plant Availability List with Trade Pricing</a>
              </p>
            </>
          )
        }
        {hasNoRoll &&
          (
            <p>
              Thanks for signing up to purchase plants! We will reach out to you soon to request more information about your business.
              You can also tell us about your business by using our <a href="/apply">application form</a>.
              Check back here once we've approved your application for access to our pricing list.
            </p>
          )
        }


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
