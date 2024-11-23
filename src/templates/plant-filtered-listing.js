/*
* use page context queries (defined in gatsby-node.js) to render filtered lists of plants by 'genus'.
*/

import React from "react";
import { Link, graphql } from "gatsby";
//import Img from "gatsby-image";
/*--Constants--*/
//import PlantSizeConstants from "../constants/PlantSizes";
/*--Components--*/
import Layout from "../components/layout";
import AvailabilityLegend from "../components/availabilityLegend";
import SEO from "../components/seo";
//import PlantTableCell from "../components/plantTableCell";
import PlantTableRow from "../components/plantTableRow";
import PlantTableHeader from "../components/plantTableHeader";
import PlantFilters from "../components/plantFilters";
/*--Style--*/
import "../components/plants.css";

//pass matching images into overview card - and pick a match based on slug + possibly '-hero' string
export const query = graphql`
  query
  {
    plantHeroes: allFile(filter: {name: {regex: "/-hero/"}}) {
      edges {
        node {
          childImageSharp {
            fixed(height:30, width:30) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
  `

const plantsFilteredByGenus = ({ data, pageContext={} }) => {
  //const nowDate = new Date();
  const {genus_name:genusName} = pageContext;
  //const excludedSizeKeys = ['plug','three_in','eight_in','twenty_ga'];//decided not to display these.

  // const getTitle = (size, availability) => {
  //   if(size && availability) {
  //     return availability[size] && `Available ${availability[size]}`;
  //   }
  //   return null;
  // }

  return (
    <Layout pageName="plant-listing">
      <SEO
        title={`Genus ${genusName} plants`}
        description={`${pageContext.totalCount} ${genusName} plants for sale.`}
      />
      <h2>Wholesale Plant Availability</h2>
      <p>
        Login to the reseller area to see plant pricing and quantities. Don't have an account? <Link to="/apply" >Apply</Link> today.

      </p>
      <p>Looking for retail plants? Visit our retail site: <a href="https://dryoasisplants.com" target="_blank" rel="noreferrer">dryoasisplants.com</a></p>

      <AvailabilityLegend />
      <PlantFilters genusName={genusName} />
      <table className="availability-grid">
        <PlantTableHeader showThumbnail={true}/>
        <tbody className="available">
        {pageContext.edges && pageContext.edges.map((edge, idx) => {
          const plant = edge.node
          // find the hero image for the current plant node.
          const thumbnail = data.plantHeroes && data.plantHeroes.edges.find(thumbnail => thumbnail.node.childImageSharp.fixed.src.includes(plant.slug))

          return (
            <PlantTableRow key={`${plant.slug}-${idx}`} plant={plant} thumbnail={thumbnail} />
          )
        })}
        </tbody>
      </table>
    </Layout>
  )
}

export default plantsFilteredByGenus
