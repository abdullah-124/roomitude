import { jwtDecode } from "jwt-decode";

export async function tokenRefresh() {
    const apiUrl = import.meta.env.VITE_API_URL;
    console.log('token')
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
            console.log('refresh token ...')
            const res = await fetch(`${apiUrl}/api/account/token/refresh/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refresh: refreshToken }),
            });

            if (res.ok) {
                const data = await res.json();
                console.log('✅sToken refreshed')
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