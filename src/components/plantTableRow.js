import React from "react";
import { Link, navigate } from "gatsby";
import Img from "gatsby-image";
/*--Constants--*/
import PlantSizeConstants from "../constants/PlantSizes";

const excludedSizeKeys = ['plug','three_in','eight_in'];//decided not to display these.

const PlantTableRow = (
  {
    plant,
    thumbnail,
    isWholesaleCustomer=false
  }
) => {
const {price, stock, upc} = plant;

  return (
    <>
    {
      Object.keys(PlantSizeConstants).filter(size => !excludedSizeKeys.includes(size)).map((size,idx) => {
      if(!!stock[size]){
        return (
          <tr key={`${plant.slug}-${idx}`} onClick={()=>{navigate(`/${plant.slug}`)}}>
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
            {isWholesaleCustomer && price && price[size] &&
              <td>{`$${price[size].toFixed(2)}`}</td>
            }
          </tr>
        )
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
