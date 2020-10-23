import React from 'react';
import PlantSizeConstants from "../constants/PlantSizes";

const PlantTableHeader = ({showName=true}) => {
  return (
    <thead>
      <tr>
        {showName && <th>Botanical Name</th>}
        {Object.values(PlantSizeConstants).map((size) => (<th key={`header-${size}`}>{size}</th>))}
      </tr>
    </thead>
  )
};

export default PlantTableHeader;
