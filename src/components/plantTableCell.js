import React from "react"

const PlantTableCell = ({size, plant, nowDate}) => {

  const monthDiff = (dateFrom, dateTo) => {
   return dateTo.getMonth() - dateFrom.getMonth() +
     (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
  }

  const getClassName = (size, availability) => {
    if(size && availability) {
      const availableDateStr = availability[size];
      if(availableDateStr === 'sold_out') return 'sold-out';//when none left - no point displaying availability date.
      if(availableDateStr) {
        let monthsAway = monthDiff(nowDate, new Date(availableDateStr));
        monthsAway = Math.max(monthsAway, 0);
        return {
          0:'now',
          1:'very-soon',
          2:'soon',
          3:'awhile',
          4:'a-long-while',
          5:'a-very-long-while'
        }[monthsAway];
      }
    }
    return null;
  }

  const getTitle = (size, availability) => {
    if(size && availability) {
      return availability[size] && `Available ${availability[size]}`;
    }
    return null;
  }

  const {price, availability} = plant;
  const availabilityClassName = getClassName(size, availability);

  return (
    <td className={availabilityClassName} title={getTitle(size, availability)}>
      {price[size] && `$${price[size]}`}
    </td>
  )
}

export default PlantTableCell;
