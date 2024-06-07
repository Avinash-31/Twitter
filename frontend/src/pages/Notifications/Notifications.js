import React from "react";
import "../Page.css";
import { useTranslation } from "react-i18next";

const Notifications = () => {
  const{t} = useTranslation()
  const{welcome} = t("notifications");
  return (
    <div className="page">
      <h2 className="pageTitle">{welcome}</h2>
    </div>
  );
};

export default Notifications;
