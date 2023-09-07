import { useEffect, useState } from "react";
import { json } from "d3-fetch";

const useFilterData = (
  url = "https://gist.githubusercontent.com/uKiJo/8a6c70d684a55841a2c04340c5325f15/raw/bae59e2d726b9ce5bc14650c69ec07e2e5c8c3e3/mpd.json"
) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedData = await json(url);

        setData(fetchedData);
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

export default useFilterData;
