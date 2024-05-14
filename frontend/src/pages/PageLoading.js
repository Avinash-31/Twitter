import React from "react";
import "../pages/Login/Login.css";
const imagePath = "/static/media/twitter.9614a59eb1b7861a29ca.png";

const PageLoading = () => {
  return (
    <div
      style={{ display: "flex",height:"100%", alignItems:"center", width:"100%", justifyContent: "center" }}
    >
      <img className="image1" src={imagePath} alt="Description of the image" />

    </div>
  );
};

export default PageLoading;
