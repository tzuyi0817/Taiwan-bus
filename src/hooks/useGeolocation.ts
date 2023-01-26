import { useState, useEffect } from 'react';

function useGeolocation() {
  const [position, setPosition] = useState({ lat: 24, lng: 121 });

  useEffect(() => {
    function success({ coords }: GeolocationPosition) {
      setPosition({ lat: coords.latitude, lng: coords.longitude });
    }

    navigator.geolocation?.getCurrentPosition(success);
  }, []);

  return { position };
}

export default useGeolocation;
