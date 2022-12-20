/*
* use page context queries (defined in gatsby-node.js) to render filtered lists of plants by 'genus'.
*/

import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
/*--Constants--*/
import PlantSizeConstants from "../constants/PlantSizes";
/*--Components--*/
import Layout from "../components/layout";
import AvailabilityLegend from "../components/availabilityLegend";
import SEO from "../components/seo";
import PlantTableCell from "../components/plantTableCell";
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
            fixed(height:50, width:50) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
  `

const plantsFilteredByGenus = ({ data, pageContext={} }) => {
  const nowDate = new Date();
  const {genus_name:genusName} = pageContext;
  const excludedSizeKeys = ['plug','three_in','eight_in','twenty_ga'];//decided not to display these.

  return (
    <Layout pageName="plant-listing">
      <SEO
        title={`Genus ${genusName} plants`}
        description={`${pageContext.totalCount} ${genusName} plants for sale.`}
      />
      <AvailabilityLegend />
      <PlantFilters genusName={genusName} />
      <table className="availability-grid">
        <PlantTableHeader showThumbnail={true}/>
        <tbody className="available">
        {pageContext.edges && pageContext.edges.map(edge => {
          const plant = edge.node

          // find the hero image for the current plant node.
          const thumbnail = data.plantHeroes && data.plantHeroes.edges.find(thumbnail => thumbnail.node.childImageSharp.fixed.src.includes(plant.slug))
          return (
            <tr key={`${plant.slug}-row`}>
              <td>
                {thumbnail && <Img
                  className="plant-thumbnail"
                  imgStyle={{borderRadius:`50%`}}
                  fixed={thumbnail.node.childImageSharp.fixed}
                  title={plant.title}
                  alt={plant.title}
                  />}
              </td>
              <td><Link to={`/${plant.slug}`}>{plant.title}</Link></td>
              {Object.keys(PlantSizeConstants).filter(size => !excludedSizeKeys.includes(size)).map((size) =>
                <PlantTableCell key={`${plant.slug}-${size}`} plant={plant} size={size} nowDate={nowDate} />
              )}
            </tr>
          )
        })}
        </tbody>
      </table>
    </Layout>
  )
}

export default plantsFilteredByGenus
