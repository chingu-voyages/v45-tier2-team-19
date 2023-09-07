import PropTypes from "prop-types";
import { formatLocale } from "d3-format";

const locale = formatLocale({
  decimal: ",",
  thousands: "\u00a0",
  grouping: [3],
  currency: ["", " g"],
  minus: "\u2212",
  percent: "\u202f%",
});

const fformat = locale.format("$,");

const TooltipDemo = ({ tooltipData }) => {
  return (
    <div
      // className="tooltip"
      style={{
        position: "fixed",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        color: "white",
        padding: "5px",
        borderRadius: "3px",
        fontSize: "12px",
        left: tooltipData.x + 10,
        top: tooltipData.y + 10,
      }}
    >
      <div>Name: {tooltipData.name}</div>
      <div>Latitude: {tooltipData.reclat}</div>
      <div>Longitude: {tooltipData.reclong}</div>
      <div>State: {tooltipData.state}</div>
      <div>Country: {tooltipData.country}</div>
      <div>Mass: {fformat(tooltipData.mass)}</div>
    </div>
  );
};

TooltipDemo.propTypes = {
  tooltipData: PropTypes.shape({
    name: PropTypes.string,
    reclat: PropTypes.string,
    reclong: PropTypes.string,
    state: PropTypes.string,
    mass: PropTypes.string,
    country: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
  }),
};

export default TooltipDemo;
