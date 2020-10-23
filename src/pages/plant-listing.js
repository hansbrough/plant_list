import React from "react";
import { Link, graphql } from "gatsby";

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
    <Layout>
      <SEO title="Plant Listing" />
      <h1>All Plants</h1>

      <AvailabilityLegend />
      <table>
        <PlantTableHeader />
        <tbody className="available">
        {data && data.allPlantsJson.edges.map(edge => {
          const plant = edge.node;

          return (
            <tr key={`${plant.slug}-row`}>
              <td><Link to={`/${plant.slug}`}>{plant.title}</Link></td>
              {Object.keys(PlantSizeConstants).map((size) => <PlantTableCell key={`${plant.slug}-${size}`} plant={plant} size={size} nowDate={nowDate} /> )}
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
  }
`

export default IndexPage
