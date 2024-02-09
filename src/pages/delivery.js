import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import Layout from "../components/layout";
import SEO from "../components/seo";

// results automagically passed to page component as 'data'
export const query = graphql`
  query {
    nurseryHero:file(name: { eq: "rows_low_contrast" }) {
        childImageSharp {
          fixed(width:800) {
            ...GatsbyImageSharpFixed
          }
        }
      }
  }
`

const DeliveryPage = ({data}) => {

  return (
    <>
    <Layout pageName="delivery">
      <SEO title="Brough Plants Delivery and Pickup Information" />
      <h2>Delivery and Pickup</h2>
      <h3>Schedule a Delivery</h3>
      <p>
        Orders will be held for a period of two weeks. Any orders not collected within this timeframe may be subject to restocking and associated fees.
      </p>
      <ul>
        <li>For deliveries to the central Bay Area (areas South of Santa Rosa, Southwest of Vacaville, West of Antioch/Livermore, and North of San Jose), there is a delivery fee of 10% of the subtotal, with a minimum charge of $100.</li>
        <li>For deliveries to the extended Bay Area (areas North of Santa Rosa, Sacramento, Stockton, and Monterrey), the delivery fee is 15% of the subtotal, with a minimum charge of $150.</li>
        <li>Deliveries outside of the extended Bay Area or exceeding 100 miles will incur a negotiated delivery rate.</li>
        <li>Orders must meet a minimum subtotal of $400 to qualify for delivery.</li>
        <li>Customer assistance for unloading materials is required, and delivery is strictly curbside.</li>
        <li>Cancellation, rejection, or rescheduling of delivery may be subject to applicable restocking fees.</li>
      </ul>

      <h3>Pick-up your order</h3>
      <p>
        Plant orders are available for pick up at our Halfmoon Bay Nursery.
        Orders will be held for a period of two weeks. Any orders not collected within this timeframe may be subject to restocking and associated fees.
      </p>

      <Img
          fixed={data.nurseryHero.childImageSharp.fixed}
          alt="Greenhouse Bulbils"
          className="aloe-regions-map"
        />

    </Layout>
    </>
  )
}


export default DeliveryPage
