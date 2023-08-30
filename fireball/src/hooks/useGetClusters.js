import { json } from "d3-fetch";
import { useEffect, useState } from "react";
// import { feature, mesh } from "topojson-client";

const clusterDataUrl =
  "https://gist.githubusercontent.com/uKiJo/3b4239075885e9f2162c27dfc779521f/raw/27d4809b56ce32089766a35f280debcaef4a2f52/clust.json";

export const useGetClusters = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await json(clusterDataUrl);

        setData(data);

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
