export default async function logout() {
    console.log('logout btn')
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    const response = await fetch("http://127.0.0.1:8000/api/account/logout/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ refresh: refreshToken }),
    });

    if (response.ok) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        console.log("Logout successful");
    } else {
        const error = await response.json();
        console.error("Logout failed:", error.detail);
    }
}
