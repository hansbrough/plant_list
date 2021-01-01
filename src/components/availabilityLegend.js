import React from "react";

const AvailabilityLegend = () => {

  return (
    <div className="availability-legend">
      <h2 className="legend-title">Availability</h2>
      <div className="legend-scale">
        <ul className="available legend-labels">
          <li><span className="now"></span><span className="px-1">Available Now!</span></li>
          <li><span className="very-soon"></span><span className="px-1">Jan, 2021</span></li>
          <li><span className="soon"></span><span className="px-1">Feb, 2021</span></li>
          <li><span className="awhile"></span><span className="px-1">March, 2021</span></li>
          <li><span className="a-long-while"></span><span className="px-1">April, 2021</span></li>
        </ul>
      </div>
    </div>
  )
}

export default AvailabilityLegend;
