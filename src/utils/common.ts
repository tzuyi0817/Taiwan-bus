export function debounce<T>(fn: T, delay = 500) {
  if (typeof fn !== 'function') 
    throw new TypeError('The first argument is not a function');
  let timer: NodeJS.Timeout | null = null;

  return function (this: unknown, ...args: unknown[]) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  }
}

export function sleep(time = 500) {
  return new Promise(resolve => setTimeout(resolve, time));
}

interface Coordinate {
  lat: number;
  lng: number;
}

export function calculateDistance(coord1: Coordinate, coord2: Coordinate) {
  if (coord1.lat == coord2.lat && coord1.lng == coord2.lng) return 0;
  const rad1 = (Math.PI * coord1.lat) / 180;
  const rad2 = (Math.PI * coord2.lat) / 180;
  const theta = coord1.lng - coord2.lng;
  const radTheta = (Math.PI * theta) / 180;

  let dist =
    Math.sin(rad1) * Math.sin(rad2) +
    Math.cos(rad1) * Math.cos(rad2) * Math.cos(radTheta);

  if (dist > 1) dist = 1;
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  dist = dist * 1.609344; //convert miles to km
  return dist;
}
