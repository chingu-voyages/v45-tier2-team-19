import { json } from "d3-fetch";
import { useEffect, useState } from "react";

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
