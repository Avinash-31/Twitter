import React, { useState, useEffect } from "react";
import TweetBox from "./TweetBox/TweetBox";
import Post from "./Post/Post";
import './Feed.css'
import { useTranslation } from "react-i18next";
import MoreIcon from '@mui/icons-material/More';
import { Box, Modal } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import VerifiedIcon from '@mui/icons-material/Verified';
import FiveKPlusIcon from '@mui/icons-material/FiveKPlus';
import TokenIcon from '@mui/icons-material/Token';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbUpIcon from '@mui/icons-material/ArrowCircleUp';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    fetch("http://localhost:5000/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  }, [posts]);

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

  const moreModal = (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 200 }}>
        <CloseIcon className="closeBtn" onClick={() => setOpenModal(false)} />
        <h2 id="parent-modal-title">Badges</h2>
        <p id="parent-modal-description">
          <div className="info">
            <VerifiedIcon style={{ color: '#1DA1F2' }} />  : Plus Member
          </div>
          <br />
          <div className="info">
            <TokenIcon style={{ color: 'black' }} /> Token 
          </div>
          <br />
          <div className="info">
            <TokenIcon style={{ color: 'grey' }} /> Token 
          </div>
          <br />
          <div className="info">
            <FavoriteIcon style={{ color: 'magenta' }} /> Favourite
          </div>
          <br />
          <div className="info">
            <FavoriteIcon style={{ color: 'red' }} /> Favourite
          </div>
          <br />
          <div className="info">
            <ThumbUpIcon style={{ color: 'green' }} /> : Upvotes
          </div>
          <br />
          <div className="info">
            <ThumbUpIcon style={{ color: 'blue' }} /> : Upvotes
          </div>
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
