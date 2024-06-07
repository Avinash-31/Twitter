import React from "react";
import { useTranslation } from "react-i18next";

const Explore = () => {
  const {t} = useTranslation();
  const {welcome} = t("explore")

  return (
    <div className="page">
      <h2 className="pageTitle">{welcome}</h2>
    </div>
  );
};

export default Explore;
