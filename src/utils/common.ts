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