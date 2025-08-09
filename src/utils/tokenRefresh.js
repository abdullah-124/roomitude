import { jwtDecode } from "jwt-decode";

export async function tokenRefresh() {
    let accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken || !refreshToken) {
        return;
    }

    // console.log('old token ',accessToken);
    const BUFFER_TIME = 30; // seconds
    const decoded = jwtDecode(accessToken);
    const now = Date.now() / 1000;
    if (decoded.exp < now + BUFFER_TIME) {
        const res = await fetch("http://127.0.0.1:8000/api/account/token/refresh/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh: refreshToken }),
        });

        if (res.ok) {
            const data = await res.json();
            accessToken = data.access;
            localStorage.setItem("accessToken", accessToken);
            return
        }
        else{
            localStorage.clear()
        }
    }
    return
}
