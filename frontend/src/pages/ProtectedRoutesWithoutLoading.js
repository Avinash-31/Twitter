import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import auth from "../firebase.init";

const ProtectedRoutesWithoutLoading = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return;
  }
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoutesWithoutLoading;
