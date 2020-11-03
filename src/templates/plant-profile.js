import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"
//import { OutboundLink } from "gatsby-plugin-google-analytics"

import PlantTableCell from "../components/plantTableCell";
import PlantTableHeader from "../components/plantTableHeader";
import PlantSizeConstants from "../constants/PlantSizes";
import AvailabilityLegend from "../components/availabilityLegend";

import "../components/plants.css"
// Notes: aliased image query only way I could figure out how to pass a variable image name
// into gatsby-image. all examples on line show hardwired filename strings using "useStaticQuery"

export const query = graphql`
  query(
    $slug: String!, $image_hero_regex: String!, $image_regex: String!
  ){
    plantsJson(slug: { eq: $slug }) {
      title
      aka
      overview
      resource_link
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

    plantHeroThumbnail: allFile(filter: {name: {regex: $image_hero_regex}}) {
      edges {
        node {
          childImageSharp {
            fixed(height:100, width:100) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }

    plantImages: allFile(filter: {name: {regex: $image_regex}}) {
      edges {
        node {
          childImageSharp {
            fixed(height: 300) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`

const Plant = ({ data, pageContext }) => {
  const nowDate = new Date();
  const plant = data.plantsJson;
  const akaText = !!plant.aka.length && `Also Known As: ${plant.aka.join(", ")}`;

  return (
    <Layout>
      <SEO
        title={plant.title}
        description={plant.overview.slice(0,150)}
      />

      <article>
        <section className="plant-heading-group">
          {data.plantHeroThumbnail.edges && data.plantHeroThumbnail.edges[0] &&
            <Img
              className="plant-thumbnail"
              imgStyle={{borderRadius:`50%`}}
              fixed={data.plantHeroThumbnail.edges[0].node.childImageSharp.fixed}
              title={plant.title}
              alt={plant.overview.slice(0,100)}
            />
          }

          <div>
            <h1 className="plant-title">{plant.title}</h1>
            <p className="plant-alias plant-attribute">{akaText}</p>
          </div>
        </section>

        <section>
          <h2>Overview</h2>
          <p>
            {plant.overview}
            {plant.resource_link && <a style={{paddingLeft:".5rem"}} href={plant.resource_link} target="_blank" rel="noopener noreferrer">Learn more about {plant.title}</a>}
          </p>
        </section>

        <AvailabilityLegend />
        <table>
          <PlantTableHeader showName={false}/>
          <tbody className="available">
          {plant &&
            (
              <tr>
                {Object.keys(PlantSizeConstants).map((size) => <PlantTableCell key={`${plant.slug}-${size}`} plant={plant} size={size} nowDate={nowDate} /> )}
              </tr>
            )
          }
          </tbody>
        </table>

        <section className="plant-gallery">
        {
          data.plantImages.edges.map(image => (
            <Img
              key={image.node.childImageSharp.fixed.src}
              fixed={image.node.childImageSharp.fixed}
              title={plant.title}
              alt={plant.overview.slice(0,100)}
            />
          ))
        }
        </section>

      </article>

      <p><Link to="/plant-listing">All Plants</Link></p>
    </Layout>
  )
}

export default Plant;
