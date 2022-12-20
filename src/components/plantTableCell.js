import React from "react"

const PlantTableCell = ({size, plant, nowDate}) => {

  const monthDiff = (dateFrom, dateTo) => {
   return dateTo.getMonth() - dateFrom.getMonth() +
     (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
  }

  // return string of css class names
  const getClassNames = (size, availability, stock) => {
    //console.log("getClassNames:",size, availability, stock)
    const classNames = [];
    if(size && availability && stock) {
      const availableDateStr = availability[size];
      if(stock[size] && stock[size] < 5) { //not many left
        classNames.push('low-stock');
      }
      // if(availableDateStr === 'sold_out') {
      //   classNames.push('sold-out');//when none left - no point displaying availability date.
      // }
      if(availableDateStr) {
        let monthsAway = monthDiff(nowDate, new Date(availableDateStr));
        monthsAway = Math.max(monthsAway, 0);
        classNames.push({
          0:'now',
          1:'soon',
          2:'soon',
          3:'soon',
          4:'a-long-while',
          5:'a-long-while'
        }[monthsAway]);
      }

    }
    return classNames.join(' ');
  }

  const getTitle = (size, availability) => {
    if(size && availability) {
      return availability[size] && `Available ${availability[size]}`;
    }
    return null;
  }

  const {price, availability, stock} = plant;
  const availabilityClassNames = getClassNames(size, availability, stock);

  return (
    <td className={availabilityClassNames} title={getTitle(size, availability)}>
      {/*{price[size] && `$${price[size]}`}*/}
    </td>
  )
}

export default PlantTableCell;
