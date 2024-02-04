import React from "react";

const AvailabilityLegend = () => {

  return (
    <div className="availability-legend">
      <div className="legend-scale">
        <ul className="available legend-labels">
          <li><span className="now"></span><span className="px-1">Available</span></li>
          <li><span className="soon"></span><span className="px-1">Coming Soon</span></li>
        </ul>
      </div>

      <p className="legend-msg"></p>
    </div>
  )
}

export default AvailabilityLegend;
