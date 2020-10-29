import React from 'react';
import PlantSizeConstants from "../constants/PlantSizes";

const PlantTableHeader = ({showName=true, showThumbnail=false, showPlantTotal=false}) => {
  return (
    <thead>
      <tr>
        {showThumbnail && <th>&nbsp;</th>}
        {showName && <th>Botanical Name</th>}
        {Object.values(PlantSizeConstants).map((size) => (<th key={`header-${size}`}>{size}</th>))}
        {showPlantTotal && <th>SubTotal</th>}
      </tr>
    </thead>
  )
};

export default PlantTableHeader;
