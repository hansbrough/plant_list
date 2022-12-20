import React from 'react';
import PlantSizeConstants from "../constants/PlantSizes";

const PlantTableHeader = ({showName=true, showThumbnail=false, showPlantTotal=false}) => {
  const excludedSizeValues = ['plug','3"','8"','20 ga.'];//decided not to display these.

  return (
    <thead>
      <tr>
        {showThumbnail && <th>&nbsp;</th>}
        {showName && <th>Name</th>}
        {Object.values(PlantSizeConstants).filter(size => !excludedSizeValues.includes(size)).map((size) => (<th key={`header-${size}`}>{size}</th>))}
        {showPlantTotal && <th>SubTotal</th>}
      </tr>
    </thead>
  )
};

export default PlantTableHeader;
