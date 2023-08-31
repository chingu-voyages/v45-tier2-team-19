const fetchLocationData = async (latitude, longitude) => {
  const API_KEY = "SQ2wqGDLvUAL1TEwaOucCOLQaAs81Eto";

  if (latitude && longitude && API_KEY) {
    const apiUrl = `https://api.tomtom.com/search/2/reverseGeocode/${latitude},${longitude}.json?key=${API_KEY}`;

    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("API request failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return null;
};

export { fetchLocationData };
