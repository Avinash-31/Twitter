import React from "react";
import "../Page.css";
import { useTranslation } from "react-i18next";

const BookMarks = () => {
  const {t} = useTranslation();
  const{welcome} = t("bookmarks");
  return (
    <div className="page">
      <h2 className="pageTitle">{welcome}</h2>
    </div>
  );
};

export default BookMarks;
