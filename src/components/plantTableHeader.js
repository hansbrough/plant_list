import React from 'react';
import PlantSizeConstants from "../constants/PlantSizes";

const PlantTableHeader = (
  {
    showName=true,
    showThumbnail=false,
    showUpc=true,
    showPlantTotal=true,
    showFullStockInfo=false,
    isWholesaleCustomer=false
  }
) => {
  return (
    <thead>
      <tr>
        {showThumbnail && <th>&nbsp;</th>}
        {showName && <th>Name</th>}
        {showUpc && <th>UPC</th>}
        {showPlantTotal && <th>Available</th>}
        {isWholesaleCustomer && <th>Price</th>}
        {showFullStockInfo && <>
          {Object.values(PlantSizeConstants).map((size) => <th key={`header-${size}`} >{`${size}`}</th> )}
          </>
        }
      </tr>
    </thead>
  )
};

export default PlantTableHeader;
