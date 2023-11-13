import { useEffect, useState } from "react";

/**
 * @returns [latitude, longitude]
 */
export const useGeoLocation = () => {
  const [location, setLocation] = useState<[number, number] | null>();
  const { geolocation } = navigator;
  useEffect(() => {
    geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setLocation([latitude, longitude]);
    });
  }, [geolocation]);

  return location;
};
