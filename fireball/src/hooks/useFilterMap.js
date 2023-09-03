import { useEffect, useState } from "react";
import { json } from "d3-fetch";

const url =
  "https://gist.githubusercontent.com/uKiJo/8655699e6f0a64c84d25ad652a9ca072/raw/8ed19eadc38db9a5606d3831c1c717d6b5358920/meteorite-landing.csv";

const useFilterData = (
  url = "https://gist.githubusercontent.com/uKiJo/6a97fc04b08a7e7e4f394b36d49d8e35/raw/3cc319c071a2dd5cf007023678f37bb9f2a533f8/landingsfm.json"
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
