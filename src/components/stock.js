/*
* Note: uses 'StaticQuery' to make graphql query from inside a component (vs a page level call which has diff formatting)
*
*/
import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";

import PlantTableHeader from "../components/plantTableHeader";
import PlantSizeConstants from "../constants/PlantSizes";
import "../components/plants.css";
import "../components/print.css";

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

  // get total stock available at a given size pot
  const getSizeTotal = (plants=[], size) => {
    let stockSizeTotal = 0;
    plants.forEach(plant => {
      stockSizeTotal += plant.node?.stock[size] ?? 0;
    })
    return stockSizeTotal;
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
                  twenty_ga
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
                  twenty_ga
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
                  twenty_ga
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
              <td ><b>All Plant Stock Total:</b></td>
              <td>{`${getSizeTotal(data.allPlantsJson.edges,'plug')}`}</td>
              <td>{`${getSizeTotal(data.allPlantsJson.edges,'two_in')}`}</td>
              <td>{`${getSizeTotal(data.allPlantsJson.edges,'three_in')}`}</td>
              <td>{`${getSizeTotal(data.allPlantsJson.edges,'four_in')}`}</td>
              <td>{`${getSizeTotal(data.allPlantsJson.edges,'six_in')}`}</td>
              <td>{`${getSizeTotal(data.allPlantsJson.edges,'eight_in')}`}</td>
              <td>{`${getSizeTotal(data.allPlantsJson.edges,'one_ga')}`}</td>
              <td>{`${getSizeTotal(data.allPlantsJson.edges,'two_ga')}`}</td>
              <td>{`${getSizeTotal(data.allPlantsJson.edges,'five_ga')}`}</td>
              <td>{`${getSizeTotal(data.allPlantsJson.edges,'seven_ga')}`}</td>
              <td>{`${getSizeTotal(data.allPlantsJson.edges,'ten_ga')}`}</td>
              <td>{`${getSizeTotal(data.allPlantsJson.edges,'fifteen_ga')}`}</td>
              <td>{`${getSizeTotal(data.allPlantsJson.edges,'twenty_ga')}`}</td>
              <td className="total">{`$${getStockTotal(data.allPlantsJson.edges)}`}</td>
            </tr>
          </tbody>
        </table>
      )}
    />
  )
}
