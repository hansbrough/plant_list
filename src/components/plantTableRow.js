import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
/*--Constants--*/
import PlantSizeConstants from "../constants/PlantSizes";

const excludedSizeKeys = ['plug','three_in','eight_in','twenty_ga'];//decided not to display these.

const PlantTableRow = ({plant, thumbnail}) => {
console.log("plant:",plant)
const {stock, upc} = plant;
  //console.log("upc(s):",upc)
  return (
    <>
    {
      Object.keys(PlantSizeConstants).filter(size => !excludedSizeKeys.includes(size)).map((size,idx) => {
      //console.log("...stock[size]:",stock && !!stock[size])
      if(!!stock[size]){
        //console.log("......rendering:",size)
        return <tr key={`${plant.slug}-${idx}`}>
          <td>
            {thumbnail && <Img
              className="plant-thumbnail"
              imgStyle={{borderRadius:`50%`}}
              fixed={thumbnail.node.childImageSharp.fixed}
              title={plant.title}
              alt={plant.title}
              />}
          </td>
          <td><Link to={`/${plant.slug}`}>{`${plant.title} ${PlantSizeConstants[size]}`}</Link></td>
          <td>{upc && upc[size]}</td>
          <td>{stock && stock[size]}</td>
        </tr>
      } else {
        return null;
      }
      }
      )
    }
    </>
  )

}

export default PlantTableRow;
