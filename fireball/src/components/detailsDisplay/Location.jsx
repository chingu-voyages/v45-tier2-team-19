import { useState, useEffect, useRef } from "react";

const Location = ({ reclat, reclong }) => {
  const [country, setCountry] = useState("pending...");
  const count = useRef(0);

  useEffect(() => {
    fetchLocation();
  }, []);

  const fetchLocation = async () => {
    const API_KEY = "SQ2wqGDLvUAL1TEwaOucCOLQaAs81Eto";
    try {
      if (reclat && reclong) {
        const latitude = parseFloat(reclat);
        const longitude = parseFloat(reclong);
        // const apiUrl = `https://api.tomtom.com/search/2/reverseGeocode/${latitude},${longitude}.json?key=${API_KEY}&radius=100`;
        const apiUrl = `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`;
        const data = await fetch(apiUrl);
        if ((data.status === 429 || data.status === 403) && count.current < 3) {
          count.current = count.current + 1;
          setTimeout(() => fetchLocation(), 1000);
        }
        if (data.ok) {
          const res = await data.json();
          console.log(res);
          // setCountry(res?.addresses[0]?.address?.country);
          setCountry(res?.address?.country);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  return country;
};

export default Location;
