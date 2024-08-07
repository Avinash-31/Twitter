import React, { useState, useEffect } from "react";
import "./MainPage.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import UseLoggedinUser from "../../../hooks/UseLoggedInUser";
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import AddLinkIcon from "@mui/icons-material/AddLink";
import Post from "../../Feed/Post/Post";
import LockResetIcon from "@mui/icons-material/LockReset";
import axios from "axios";
import EditProfile from "../EditProfile/EditProfile";
import { useTranslation } from "react-i18next";

const MainPage = ({ user }) => {
  const {t} = useTranslation();
  const {tweets} = t("mainPage");

  const navigate = useNavigate();
  const [loggedInUser] = UseLoggedinUser();
  const [posts, setPosts] = useState([]);
  const [imageURL, setImageURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const pi = loggedInUser[0]?.profileImage
    ? loggedInUser[0].profileImage
    : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png";

  useEffect(() => {
    fetch(`https://twitter-qgxu.onrender.com/user/posts?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  }, [posts, user?.email]);

  const username = user?.email?.split("@")[0];

  const handleUploadCoverImage = (e) => {
    setIsLoading(true);
    const image = e.target.files[0];
    console.log(image);

    const formData = new FormData();
    formData.set("image", image);
    axios
      .post(
        "https://api.imgbb.com/1/upload?key=37fe4cb64c9314cb7d69dc88a1d6ff3f",
        formData
      )
      .then((res) => {
        const url = res.data.data.display_url;
        setImageURL(res.data.data.display_url);
        console.log(res.data.data.display_url);
        const useCoverImage = {
          email: user?.email,
          coverImage: url,
        };
        if (url) {
          axios.patch(
            `https://twitter-qgxu.onrender.com/user/userUpdates/${user?.email}`,
            useCoverImage
          );
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };
  const handleUploadProfileImage = (e) => {
    setIsLoading(true);
    const image = e.target.files[0];
    console.log(image);

    const formData = new FormData();
    formData.set("image", image);
    axios
      .post(
        "https://api.imgbb.com/1/upload?key=37fe4cb64c9314cb7d69dc88a1d6ff3f",
        formData
      )
      .then((res) => {
        const url = res.data.data.display_url;
        setImageURL(res.data.data.display_url);
        console.log(res.data.data.display_url);
        const useprofileImage = {
          email: user?.email,
          profileImage: url,
        };
        if (url) {
          axios.patch(
            `https://twitter-qgxu.onrender.com/user/userUpdates/${user?.email}`,
            useprofileImage
          );
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };
  return (
    <div>
      <ArrowBackIcon
        className="arrow-icon"
        onClick={() => {
          navigate("/");
        }}
      />
      <h4 className="heading-4">@{username}</h4>
      <div className="mainProfile">
        <div className="profile-bio">
          {
            <div>
              <div className="coverImageContainer">
                <img
                  src={
                    loggedInUser[0]?.coverImage
                      ? loggedInUser[0].coverImage
                      : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                  }
                  alt="cover"
                  className="coverImage"
                />
                <div className="hoverCoverImage">
                  <label htmlFor="image" className="imageIcon">
                    {isLoading ? (
                      <LockResetIcon className="photoIcon photoIconDisabled" />
                    ) : (
                      <CenterFocusWeakIcon className="photoIcon" />
                    )}
                  </label>
                  <div className="imageIcon_tweetButton">
                    <input
                      type="file"
                      id="image"
                      className="imageInput"
                      onChange={handleUploadCoverImage}
                    />
                  </div>
                </div>
              </div>
              <div className="avatar-img">
                <div className="avatarContainer">
                  <img
                    src={
                      loggedInUser[0]?.profileImage
                        ? loggedInUser[0].profileImage
                        : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                    }
                    alt="cover"
                    className="avatar"
                  />
                  <div className="hoverAvatarImage">
                    <label htmlFor="profileImage" className="imageIcon">
                      {isLoading ? (
                        <LockResetIcon className="photoIcon photoIconDisabled" />
                      ) : (
                        <CenterFocusWeakIcon className="photoIcon" />
                      )}
                    </label>
                    <div className="imageIcon_tweetButton">
                      <input
                        type="file"
                        id="profileImage"
                        className="imageInput"
                        onChange={handleUploadProfileImage}
                      />
                    </div>
                  </div>
                </div>
                <div className="userInfo">
                  <div>
                    <h3 className="heading-3">
                      {loggedInUser[0]?.name
                        ? loggedInUser[0]?.name
                        : user && user?.displayName}
                    </h3>
                    <p className="usernameSection"> @{username}</p>
                  </div>
                  <EditProfile user={user} loggedInUser={loggedInUser} />
                </div>
                <div className="infoContainer">
                  {loggedInUser[0]?.bio ? loggedInUser[0]?.bio : ""}
                  <div className="loactionAndLink">
                    {loggedInUser[0]?.location ? (
                      <p className="subInfo">
                        <MyLocationIcon /> {loggedInUser[0]?.location}
                      </p>
                    ) : (
                      ""
                    )}
                    {loggedInUser[0]?.website ? (
                      <p className="subInfo link">
                        <AddLinkIcon /> {loggedInUser[0]?.website}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <h4 className="tweetsText">{tweets}</h4>
                <hr />
              </div>
              {posts.map((p) => (
                <Post id={p._id} p={p} />
              ))}
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default MainPage;
