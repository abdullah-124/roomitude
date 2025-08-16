// Debounce but separate timers for each "key" (item ID)
export function debounce(fn, delay) {
  const timers = new Map();

  return (key, ...args) => {
    if (timers.has(key)) {
      clearTimeout(timers.get(key));
    }

    const timer = setTimeout(() => {
      fn(key, ...args);
      timers.delete(key);
    }, delay);

    timers.set(key, timer);
  };
}
