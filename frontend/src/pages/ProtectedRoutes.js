import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import auth from "../firebase.init";
import PageLoading from "./PageLoading";

const ProtectedRoutes = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [backendResponseReceived,setBackendResponded] = useState(false);
  // https://twitter-qgxu.onrender.com
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://twitter-qgxu.onrender.com/", {
        method: 'GET',
        headers: {
          'Content-Type': 'application'
        }
      });
      const data = await response.json();
      console.log(data);
      if(data){
        setBackendResponded(true);
      }
    }
    fetchData();
  },[])
  if (loading && backendResponseReceived === false) {
    return <PageLoading />;
  }
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoutes;
