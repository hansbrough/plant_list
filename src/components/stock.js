/*
* Note: uses 'StaticQuery' to make graphql query from inside a component (vs a page level call which has diff formatting)
*
*/
import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";

import PlantTableHeader from "../components/plantTableHeader";
import PlantSizeConstants from "../constants/PlantSizes";
import "../components/plants.css";

export default function stockTable() {

  // get total $ amount for all sizes of a given plant.
  const getPlantTotal = (plant) => {
    const {price, stock} = plant;
    return price && stock && Object.keys(PlantSizeConstants).reduce((acc, size) => {
      return acc + (stock[size] * price[size]);
    }, 0);
  };

  // get total $ amount for all sizes of ALL plants.
  const getStockTotal = (plants=[]) => {
    let stockTotal = 0;
    plants.forEach(plant => {
      stockTotal += getPlantTotal(plant.node);
    })
    return stockTotal;
  };

  return (
    <StaticQuery
      query={graphql`
        query {
          allPlantsJson(sort: {fields: title order: ASC})
          {
            edges {
              node {
                title
                slug
                price {
                  plug
                  two_in
                  three_in
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
                  two_in
                  three_in
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
                stock {
                  plug
                  two_in
                  three_in
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
      `}

      render={data => (
        <table>
          <PlantTableHeader showPlantTotal={true} />
          <tbody className="stock">
          {data && data.allPlantsJson.edges.map(edge => {
            const plant = edge.node;
            const {stock} = plant;

            return (
              <tr key={`${plant.slug}-row`}>
                <td><Link to={`/${plant.slug}`}>{plant.title}</Link></td>
                {Object.keys(PlantSizeConstants).map((size) => <td key={`${plant.slug}-${size}`} >{stock[size] && `${stock[size]}`}</td> )}
                <td className="sub-total">{`$${getPlantTotal(plant)}`}</td>
              </tr>
            )
          })}
            <tr style={{borderTop:'3px solid #2B8CBE'}}>
              <td colSpan="13"><b>All Plant Stock Total:</b></td>
              <td className="total">{`$${getStockTotal(data.allPlantsJson.edges)}`}</td>
            </tr>
          </tbody>
        </table>
      )}
    />
  )
}
