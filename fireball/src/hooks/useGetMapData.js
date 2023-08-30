import { json } from "d3-fetch";
import { useEffect, useState } from "react";
import { feature, mesh } from "topojson-client";

const mapDataUrl = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";

export const useGetMapData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const topology = await json(mapDataUrl);

        if (topology) {
          const { countries } = topology.objects;

          // setData(topology);
          setData({
            countries: feature(topology, countries),
            interiors: mesh(topology, countries, (a, b) => a != b),
          });
        }

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
};

// export const useMapData = () => {
//   console.log("HOOK");
//   const [map, setMap] = useState(null);
//   const [data, setData] = useState(null);
//   useEffect(() => {
//     console.log("EFFECT");
//     Promise.all([
//       json(jsonDataUrl, (d) => {
//         return {
//           ...d,
//           mass: +d["mass (g)"],
//         };
//       }),
//       json(mapDataUrl),
//     ]).then(([data, topology]) => {
//       if (topology) {
//         const { countries } = topology.objects;
//         // console.log("map", topology);
//         const data2 = data
//           .filter((d) => d.reclat)
//           .map((d) => {
//             return [+d.reclat, +d.reclong];
//           });
//         console.log("data", data);
//         console.log("data 2", data2);

//         setMap({
//           countries: feature(topology, countries),
//           interiors: mesh(topology, countries, (a, b) => a != b),
//         });
//         setData(data);
//       }
//     });
//   }, []);

//   return {
//     map,
//     data,
//   };
// };
