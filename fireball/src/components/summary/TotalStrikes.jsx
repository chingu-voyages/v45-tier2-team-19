// import "./summary.css";
import summary from "./Summary.module.css";
import { formatLocale } from "d3-format";

const locale = formatLocale({
  decimal: ",",
  thousands: "\u00a0",
  grouping: [3],
  currency: ["", ""],
  minus: "\u2212",
  percent: "\u202f%",
});

const fformat = locale.format("$,");

export default function TotalStrikes({ data }) {
  const strikesCount = data?.length;

  return (
    <div className={summary.totalStrikesContainer}>
      <h3>Total Number of Strikes: </h3>
      <span>{fformat(strikesCount)}</span>
    </div>
  );
}
