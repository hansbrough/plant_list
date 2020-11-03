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

const plantsFilteredByGenus = ({ data, pageContext }) => {
  const nowDate = new Date();

  return (
    <Layout>
      <SEO
        title={`Genus ${pageContext.genus_name} plants`}
        description={`${pageContext.totalCount} ${pageContext.genus_name} plants for sale.`}
      />
      <h1>{`Genus ${pageContext.genus_name} plants`} ({pageContext.totalCount})</h1>
      <AvailabilityLegend />

      <table>
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
              {Object.keys(PlantSizeConstants).map((size) =>
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
