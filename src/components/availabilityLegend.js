import React from "react";

const AvailabilityLegend = () => {

  return (
    <div className="availability-legend">
      <h2 className="legend-title">Availability Legend</h2>


      <div className="legend-scale">
        <ul className="available legend-labels">
          <li><span className="now"></span><span className="px-1">Available</span></li>
          <li><span className="soon"></span><span className="px-1">Coming Soon</span></li>
        </ul>
      </div>

      <p>
        <br/>Plant sizes marked as 'Low' have fewer than 5 left.
      </p>
    </div>
  )
}

export default AvailabilityLegend;
