export default function objectToQueryString(obj) {
  const params = new URLSearchParams();

  Object.entries(obj).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return; // skip empty

    if (Array.isArray(value)) {
      if (value.length > 0) {
        params.append(key, value.join(",")); // join array with commas
      }
    } else {
      params.append(key, value);
    }
  });

  return params.toString();
}
