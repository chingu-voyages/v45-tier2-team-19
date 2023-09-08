import { useDataContext } from "../../hooks/useDataContext";
import "./summary.css";

export default function AverageMass() {
  const meteorData = useDataContext().data;

  let totalMass = 0;
  let totalCount = 0;

  meteorData?.forEach((meteor) => {
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
    <div className="num-data-container">
      <div className="num-data-container-mass">
        <h3 className="summary-title">Total Average Mass</h3>

        <p>{overallAvgMass} grams</p>
        <p>{kilograms} kilograms</p>
        <p>{imperialTons} Imperial Tons</p>
        <p>{usTons} US Tons</p>
      </div>
    </div>
  );
}
