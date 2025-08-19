import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AppContext } from "../../context/AppContext";

function ProtectedRoute() {
    const { user } = useContext(AppContext);

    // If user is not logged in, redirect to login page
    if (!user) {
        return <Navigate to="/account" replace />;
    }

    // Otherwise render the child routes/components
    return <Outlet />;
}

export default ProtectedRoute;
