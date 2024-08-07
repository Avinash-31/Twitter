import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import auth from "../firebase.init";
import PageLoading from "./PageLoading";

const ProtectedRoutes = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  // https://twitter-qgxu.onrender.com
  if (loading) {
    return <PageLoading />;
  }
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoutes;
