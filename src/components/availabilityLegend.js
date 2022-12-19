import React from "react";

const AvailabilityLegend = () => {

  return (
    <div className="availability-legend">
      <h2 className="legend-title">Availability Legend</h2>
      <p>
        Listed prices are wholesale and available for orders greater than $300.
        <br/>Plant sizes marked as 'Low' have fewer than 5 left.
      </p>

      <div className="legend-scale">
        <ul className="available legend-labels">
          <li><span className="now"></span><span className="px-1">Available Now!</span></li>
          <li><span className="very-soon"></span><span className="px-1">November, 2022</span></li>
          <li><span className="soon"></span><span className="px-1">December, 2022</span></li>
          <li><span className="awhile"></span><span className="px-1">January, 2023</span></li>
          <li><span className="a-long-while"></span><span className="px-1">February, 2023</span></li>
        </ul>
      </div>
    </div>
  )
}

export default AvailabilityLegend;
