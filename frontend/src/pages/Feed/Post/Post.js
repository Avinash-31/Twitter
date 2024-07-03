import React, { useEffect, useState } from "react";
import { Avatar, IconButton } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PublishIcon from "@mui/icons-material/Publish";
import ThumbUpIcon from '@mui/icons-material/ArrowCircleUp';
import FiveKPlusIcon from '@mui/icons-material/FiveKPlus';
import TokenIcon from '@mui/icons-material/Token';
import FavoriteIcon from '@mui/icons-material/Favorite';
// import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import "./Post.css";

const Post = ({ p }) => {
  const { name, username, image, video, post, profilePhoto } = p;
  const [upvotes, setUpvotes] = useState(p.upvotes); // maintain a state for upvotes
  const [hasUpvoted, setHasUpvoted] = useState(false); // maintain a state for whether the user has upvoted
  const [likes, setLikes] = useState(p.likes);
  const [hasLiked, setHasLiked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [likeCount, setLikesCount] = useState(0);
  const [upvotesCount, setUpvotesCount] = useState(0);
  const [user] = useAuthState(auth);
  const email = user?.email;


  // function to handle upvote click
  const handleUpvote = async () => {
    if (!hasUpvoted) {
      try {
        const response = await fetch(`https://twitter-qgxu.onrender.com/posts/post/${p._id}/upvote`, {
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
      // decrement the upvote in post
      try {
        const response = await fetch(`https://twitter-qgxu.onrender.com/posts/post/${p._id}/deupvote`, {
          method: 'PATCH'
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUpvotes(upvotes - 1);
      }
      catch (error) {
        console.error('Error:', error);
      }
      setHasUpvoted(false);
    }
  };

  // function to handle likes
  const handleLike = async () => {
    if (!hasLiked) {
      try {
        const response = await fetch(`https://twitter-qgxu.onrender.com/posts/post/${p._id}/like`, {
          method: 'PATCH'
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setLikes(likes + 1);
        setHasLiked(true);
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      // decrement the like count in post
      try {
        const response = await fetch(`https://twitter-qgxu.onrender.com/posts/post/${p._id}/dislike`, {
          method: 'PATCH'
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setLikes(likes - 1);
      }
      catch (error) {
        console.error('Error:', error);
      }
      setHasLiked(false);
    }
  };

  useEffect(() => {
    fetch(`https://twitter-qgxu.onrender.com/auth/userStat?postid=${p._id}`)
      .then((res) => res.json())
      .then((data) => {
        setIsSubscribed(data.isSubscribed);
        setPostCount(data.postCount);
        setLikesCount(data.totalLikes);
        setUpvotesCount(data.totalUpvotes);
        console.log(isSubscribed);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [p._id]);

  // useEffect(() => {
  //   fetch(`https://twitter-qgxu.onrender.com/userStatus?email=${email}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [email]);


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
                {/* if postCount >1000 then black coloured else if >100  then gray else none*/}
                {postCount > 1000 ? (
                  <TokenIcon className="post_badge" style={{ color: 'black' }} />
                ) : postCount > 50 ? (
                  <TokenIcon className="post_badge" style={{ color: 'gray' }} />
                ) : null}

                {likeCount > 50000 ? (
                  <FavoriteIcon className="post_badge" style={{ color: 'red' }} />
                ) : likeCount > 10000 ? (
                  <FavoriteIcon className="post_badge" style={{ color: 'magenta' }} />
                ) : null}

                {upvotesCount>50000?(
                  <ThumbUpIcon className="post_badge" style={{ color: 'blue' }} />
                ):upvotesCount>10000?(
                  <ThumbUpIcon className="post_badge" style={{ color: 'green' }} />
                ):null
                }
             @{username}
              </span>
            </h3>
          </div>
        </div>
        <div className="post_upvotes">

        </div>
        <div className="post_headerDescription">
          <p>{post}</p>
        </div>
        {image && <img style={{ position: 'relative', maxWidth: '100%', width: "100%" }} src={image} alt="" />}

        {video && <video style={{ position: 'relative', maxWidth: '100%', justifyContent: 'center' }} src={video} controls ></video>}

        <div className="post_footer">
          <ChatBubbleOutlineIcon fontSize="small" />
          <RepeatIcon fontSize="small" />
          <div>
            <FavoriteBorderIcon fontSize="small" onClick={handleLike} style={{ color: hasLiked ? 'red' : 'black' }} />
            {likes}
          </div>
          <PublishIcon fontSize="small" />
          <div>
            <ThumbUpIcon onClick={handleUpvote} style={{ color: hasUpvoted ? 'blue' : 'black' }} />
            {upvotes}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;