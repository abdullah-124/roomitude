import { jwtDecode } from "jwt-decode";

export async function tokenRefresh() {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken || !refreshToken) {
        return { success: false, error: 'No tokens found' };
    }

    try {
        const BUFFER_TIME = 60; // seconds
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
                console.log('Token refreshed')
                localStorage.setItem("accessToken", data.access);

                // Update refresh token if provided
                if (data.refresh) {
                    localStorage.setItem("refreshToken", data.refresh);
                }

                return { success: true, accessToken: data.access };
            } else {
                // Handle different error responses
                const errorData = await res.json().catch(() => ({}));
                localStorage.clear();
                return { success: false, error: errorData.detail || 'Token refresh failed' };
            }
        }

        // Token is still valid
        return { success: true, accessToken };

    } catch (error) {
        console.error('Token refresh error:', error);
        localStorage.clear();
        return { success: false, error: error.message };
    }
}