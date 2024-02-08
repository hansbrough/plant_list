import React, { useState, useEffect } from "react";
import { graphql, navigate, Link } from "gatsby";
import Img from "gatsby-image";
import { useIdentityContext } from "react-netlify-identity-widget";
import { isBrowser } from "../utils/general";
import FormInputField from '../components/FormInputField/FormInputField';
import Button from '../components/Button';
import Layout from "../components/layout";
import SEO from "../components/seo";
import NotificationBanner from '../components/NotificationBanner';

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
        Deliveries must be scheduled 48 hours in advance. Cutoff time for additions or cancellations to orders scheduled for delivery is 12 pm the day prior. Any deliveries canceled after the cutoff time will be subject to a 25% cancellation fee.
      </p>
      <ul>
        <li>We charge a 10% fee of the subtotal to deliver to the central Bay Area (South of Santa Rosa, Southwest of Vacaville, West of Antioch/Livermore, and North of San Jose).</li>
        <li>We charge a 15% fee to deliver to the extended Bay Area (North of Santa Rosa, Sacramento, Stockton, and Monterrey).</li>
        <li>All deliveries outside of the extended Bay Area or over 100 miles are subject to a negotiated rate.</li>
        <li>To qualify for delivery, the order subtotal minimum is $800.</li>
        <li>Customer assistance in unloading material is required.</li>
        <li>Delivery is curbside only.</li>
        <li>Delivery cancelation, rejection, or rescheduling is subject to applicable restocking fees.</li>
      </ul>

      <h3>Pick-up your order</h3>
      <p>
        Plant orders are available for pick up at our Halfmoon Bay Nursery.
        Orders are held for 2 weeks. Orders that are not picked up within 2 weeks may be restocked and assessed a restocking fee.
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
