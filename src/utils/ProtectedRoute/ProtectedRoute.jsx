import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { AppContext } from "../../context/AppContext";

function ProtectedRoute() {
    const { user } = useContext(AppContext);
    const location = useLocation()

    // If user is not logged in, redirect to login page
    if (!user) {
        return <Navigate to="/account/login/" state={{ from: location }} replace />;
    }

    // Otherwise render the child routes/components
    return <Outlet />;
}

export default ProtectedRoute;
