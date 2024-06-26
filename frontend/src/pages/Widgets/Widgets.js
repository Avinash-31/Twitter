import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterTweetEmbed,
} from "react-twitter-embed";
import "./Widgets.css";

const Widgets = () => {
  const { t } = useTranslation();
  return (
    <div className="widgets">
      <div className="widgets__input">
        <SearchIcon className="widgets__searchIcon" />
        <input placeholder={t("searchTwitter")} type="text" />
      </div>

      <div className="widgets__widgetContainer">
        <h2>{t("whatsHappening")}</h2>

        <TwitterTweetEmbed tweetId={"1557187138352861186"} />

        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="elonmusk"
          options={{ height: 400 }}
        />

        <TwitterShareButton
          url={"https://facebook.com/cleverprogrammer"}
          options={{ text: "#reactjs is awesome", via: "elonmusk" }}
        />
      </div>
    </div>
  );
};

export default Widgets;
