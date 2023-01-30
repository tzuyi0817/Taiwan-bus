import { useState, useEffect } from 'react';

function useGeolocation() {
  const [position, setPosition] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    function success({ coords }: GeolocationPosition) {
      setPosition({ lat: coords.latitude, lng: coords.longitude });
    }

    navigator.geolocation?.getCurrentPosition(success);
  }, []);

  return { position };
}

export default useGeolocation;
