import React, { useState, useEffect } from "react";
import TweetBox from "./TweetBox/TweetBox";
import Post from "./Post/Post";
import './Feed.css'
import { useTranslation } from "react-i18next";
import MoreIcon from '@mui/icons-material/More';
import { Box, Button, Modal } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import VerifiedIcon from '@mui/icons-material/Verified';
import TokenIcon from '@mui/icons-material/Token';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbUpIcon from '@mui/icons-material/ArrowCircleUp';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [pts, setPts] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(0);
  const [user] = useAuthState(auth);
  const email = user?.email;

  const { t } = useTranslation();
  const { badges, verified, posts1, posts2, likes1, likes2, upvotes1, upvotes2, n1, n2, t1, t2, t3, t4, t5 } = t("feed");
  useEffect(() => {
    fetch("http://localhost:5000/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  }, [posts]);

  useEffect(() => {
    fetch(`http://localhost:5000/userStatus?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        setIsSubscribed(data.isSubscribed);
        setPts(data.points);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [email]);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: 2,
    pt: 2,
    px: 4,
    pb: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  };

  // one month
  const oneMonth = async () => {
    try {
      if (pts >= 200 && !isSubscribed) {
        // update the points  method = patch
        const response = await fetch(`http://localhost:5000/convert?email=${email}&pts=${200}`, {
          method: 'PATCH'
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPts(data.points);
        setIsSubscribed(data.isSubscribed);
        // reload page
        window.location.reload();
      } else {
        if (pts < 200) {
          alert("Insufficient points!");
        }
        else {
          alert("Already Subscribed");
        }
      }
    }
    catch (error) {
      console.error('Error:', error);
    }
  };

  // one year
  const oneYear = async () => {
    try {
      if (pts >= 2000 && !isSubscribed) {
        // update the points  method = patch
        const response = await fetch(`http://localhost:5000/convert?email=${email}&pts=${2000}`, {
          method: 'PATCH'
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPts(data.points);
        setIsSubscribed(data.isSubscribed);
        window.location.reload();
      } else {
        if (pts < 2000) {
          alert("Insufficient points!");
        }
        else {
          alert("Already Subscribed");
        }
      }
    }
    catch (error) {
      console.error('Error:', error);
    }
  };

  const moreModal = (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style }}>
        <CloseIcon className="closeBtn" onClick={() => setOpenModal(false)} />
        <h2 id="parent-modal-title">{badges}</h2>
        <h5>Points : {pts}</h5>
        <p id="parent-modal-description">
          <div className="info">
            <VerifiedIcon style={{ color: '#1DA1F2' }} /> : {verified}
          </div>
          <div className="info">
            <TokenIcon style={{ color: 'black' }} /> : {posts1}
          </div>
          <div className="info">
            <TokenIcon style={{ color: 'grey' }} /> : {posts2}
          </div>
          <div className="info">
            <FavoriteIcon style={{ color: 'red' }} /> : {likes1}
          </div>
          <div className="info">
            <FavoriteIcon style={{ color: 'magenta' }} /> : {likes2}
          </div>
          <div className="info">
            <ThumbUpIcon style={{ color: 'blue' }} /> : {upvotes1}
          </div>
          <div className="info">
            <ThumbUpIcon style={{ color: 'green' }} /> : {upvotes2}
          </div>
          <div className="info">
            <ThumbDownOffAltIcon style={{ color: 'red' }} /> : {n1} <br /> {n2}
          </div>
          <br />
          <hr />
          <p id="parent-modal-description">

            {t1}
            <br />
            {t2}
            <br />
            {t3}
            <Button onClick={oneMonth}>{t4}</Button>
            {t5}
            <Button onClick={oneYear}>{t4}</Button>
          </p>
        </p>
      </Box>
    </Modal >
  );

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>{t("sidebarHome")}</h2>
        {/* on clicking MoreIcon modal should appear */}
        <button className="btnIcon" onClick={setOpenModal}>
          <MoreIcon />
        </button>
      </div>
      <TweetBox />
      {posts.map((p) => (
        <Post key={p._id} p={p} />
      ))}
      {moreModal}
    </div>
  );
};

export default Feed;
