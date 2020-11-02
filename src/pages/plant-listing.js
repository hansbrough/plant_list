import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";
import SEO from "../components/seo";
import AvailabilityLegend from "../components/availabilityLegend";
import PlantTableCell from "../components/plantTableCell";
import PlantTableHeader from "../components/plantTableHeader";
import PlantSizeConstants from "../constants/PlantSizes";
import "../components/plants.css";

const IndexPage = ({data}) => {
  const nowDate = new Date();

  return (
    <Layout pageName="plant-listing">
      <SEO title="Plant Listing" />

      <AvailabilityLegend />
      <table>
        <PlantTableHeader showThumbnail={true}/>
        <tbody className="available">
        {data && data.allPlantsJson.edges.map(edge => {
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

// results automagically passed to page component as 'data'
export const query = graphql`
  query {
    allPlantsJson(sort: {fields: title order: ASC})
    {
      edges {
        node {
          title
          slug
          price {
            plug
            four_in
            six_in
            eight_in
            one_ga
            two_ga
            five_ga
            seven_ga
            ten_ga
            fifteen_ga
          }
          availability {
            plug
            four_in
            six_in
            eight_in
            one_ga
            two_ga
            five_ga
            seven_ga
            ten_ga
            fifteen_ga
          }
        }
      }
    }
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

export default IndexPage
