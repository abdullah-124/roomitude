export function getUser() {
    try {
        const userJson = localStorage.getItem("user");
        return userJson ? JSON.parse(userJson) : null;
    } catch (err) {
        console.error("Failed to parse user data:", err);
        return null;
    }
    return null
}