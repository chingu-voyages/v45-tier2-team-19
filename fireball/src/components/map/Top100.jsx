import { formatLocale, format } from "d3-format";
import top100 from "./Top100.module.css";

const locale = formatLocale({
  decimal: ",",
  thousands: "\u00a0",
  grouping: [3],
  currency: ["", " g"],
  minus: "\u2212",
  percent: "\u202f%",
});

const fformat = locale.format("$,");

const Top100 = ({ filteredData }) => {
  return (
    <>
      {filteredData.slice(0, 8).map((d, i) => {
        return (
          <div role="row" className={top100.row} key={d.id}>
            <span className={top100.rank}>{i + 1}</span>
            <span className={top100.name}>{d.name}</span>
            <span className={top100.mass}>{format(".2s")(+d["mass (g)"])}</span>
            <span className={top100.year}>{d.year}</span>
          </div>
        );
      })}
    </>
  );
};

export default Top100;
