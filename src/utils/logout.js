import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default async function logout(updateUser, updateMessage) {
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

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    updateUser()
    if (response.ok) {
        updateMessage({ 'text': 'Logout successfull', 'status': 'success' })
        setTimeout(() => {
            updateMessage()
        }, 3000);
    } else {
        const error = await response.json();
    }
}
