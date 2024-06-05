import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PublishIcon from "@mui/icons-material/Publish";
import ThumbUpIcon from '@mui/icons-material/ArrowCircleUp';
// import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import "./Post.css";

const Post = ({ p }) => {
  const { name, username, image, video, post, profilePhoto } = p;
  const [upvotes, setUpvotes] = useState(p.upvotes); // maintain a state for upvotes
  const [hasUpvoted, setHasUpvoted] = useState(false); // maintain a state for whether the user has upvoted
  const [isSubscribed, setIsSubscribed] = useState(0);

  // function to handle upvote click
  const handleUpvote = async () => {
    if (!hasUpvoted) {
      try {
        const response = await fetch(`http://localhost:5000/posts/${p._id}/upvote`, {
          method: 'PATCH'
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUpvotes(upvotes + 1);
        setHasUpvoted(true);
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      setUpvotes(upvotes - 1);
      setHasUpvoted(false);
    }
  };
  useEffect(() => {
    fetch(`http://localhost:5000/userStat?postid=${p._id}`)
      .then((res) => res.json())
      .then((data) => {
        setIsSubscribed(data.isSubscribed);
        console.log(isSubscribed);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [p._id]);


  return (
    <div className="post">
      <div className="post_body">
        <div className="post_header">
          <div className="post_avatar">
            <Avatar src={profilePhoto} />
          </div>
          <div className="post_headerText">
            <h3>
              {name}{" "}
              <span className="post_headerSpecial">
                {isSubscribed ? <VerifiedIcon className="post_badge" /> : null}
                @{username}
              </span>
            </h3>
          </div>
        </div>
        <div className="post_upvotes">
          Upvotes: {video ? upvotes + 1 : upvotes}
        </div>
        <div className="post_headerDescription">
          <p>{post}</p>
        </div>
        {image && <img style={{ position: 'relative', maxWidth: '100%', width: "100%" }} src={image} alt="" />}

        {video && <video style={{ position: 'relative', maxWidth: '100%', justifyContent: 'center' }} src={video} controls ></video>}

        <div className="post_footer">
          <ChatBubbleOutlineIcon fontSize="small" />
          <RepeatIcon fontSize="small" />
          <FavoriteBorderIcon fontSize="small" />
          <PublishIcon fontSize="small" />
          <ThumbUpIcon onClick={handleUpvote} style={{ color: hasUpvoted ? 'blue' : 'gray' }} />
        </div>
      </div>
    </div>
  );
};

export default Post;