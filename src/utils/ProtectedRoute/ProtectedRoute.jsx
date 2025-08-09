import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AppContext } from "../../context/AppContext";

function ProtectedRoute() {
    const { user, loading } = useContext(AppContext);

    //   if loading is true show loading 
    if (loading)
        return <div>loading...</div>
    // If user is not logged in, redirect to login page
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Otherwise render the child routes/components
    return <Outlet />;
}

export default ProtectedRoute;
