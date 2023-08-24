import React from "react";
import { useDataContext } from "../../hooks/useDataContext";
import "./summary.css";

export default function AverageMass() {
  const meteorData = useDataContext().data;

  let totalMass = 0;
  let totalCount = 0;

  meteorData.forEach((meteor) => {
    const massValue = meteor["mass (g)"];
    const mass = massValue ? parseFloat(massValue.split(",").join("")) : 0;

    totalMass += mass;
    totalCount++;
  });

  const overallAvgMass = (totalMass / totalCount).toFixed(2);
  const imperialTons = (overallAvgMass / 10160).toFixed(2);
  const usTons = (overallAvgMass / 9072).toFixed(2);
  const kilograms = (overallAvgMass / 10).toFixed(2);

  return (
    <div className="mass-container">
      <span>
        <h3 className="title">Total Average Mass</h3>
        <div className="data-text">
          <h4>{overallAvgMass} grams</h4>
          <h4>{kilograms} kilograms</h4>
          <h4>{imperialTons} Imperial Tons</h4>
          <h4>{usTons} US Tons</h4>
        </div>
      </span>
    </div>
  );
}
