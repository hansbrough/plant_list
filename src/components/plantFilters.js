import React from "react";
import Select from "react-select";
import {navigate} from "gatsby";

const PlantFilters = ({genusName='all'}) => {
  const options = [
    { value: 'all', label: 'All' },
    { value: 'agave', label: 'Agave' },
    { value: 'aloe', label: 'Aloe' },
    { value: 'other', label: 'Other Plants' },
  ];
  const defaultValue = options.find( item => item.value === genusName);
  const handleOnChange = e => {
    const path = (e.value === 'all') ? '/plant-listing' : `/plant-listing/${e.value}`;
    navigate(path)
  };

  // set custom 'react-select' styles
  const selectStyles = {
    container: styles => ({ ...styles, minWidth: '10rem' }),
  };

  return (
    <section className="filters-container">
      <label htmlFor="#genusOptions" style={{paddingRight:".5rem"}}>Plant Genus:</label>
      <Select
        id="genusOptions"
        options={options}
        defaultValue={defaultValue}
        onChange={handleOnChange}
        styles={selectStyles}
      />
    </section>
  );
}

export default PlantFilters;
