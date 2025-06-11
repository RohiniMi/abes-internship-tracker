import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, allowedRoles }) => {
    const storage = localStorage.getItem("token") ? localStorage : sessionStorage;
    const token = storage.getItem("token");
    const role = storage.getItem("role");

    if (!token || !role) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/login" replace />;
    }

    return <Component />;
};

export default ProtectedRoute;
