import { useEffect, useState } from "react";
import { json } from "d3-fetch";

export const useGetFilteredMap = (
  url = "https://gist.githubusercontent.com/uKiJo/c59e4590bf8b53d40073f437802da368/raw/c252c6508a9df27023ba7ce947b03616e66a7819/mpd2.json"
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
