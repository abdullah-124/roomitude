// request_to_api.js
export async function request_to_api(url, method = "GET", body = null, token = null) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const options = {
      method,
      headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const res = await fetch(url, options);
    const data = await res.json().catch(() => null); // handle 204 No Content

    if (!res.ok) {
      throw new Error(data?.error || data?.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    console.error("API Request Error:", error.message);
    throw error; // rethrow so caller can catch it
  }
}
