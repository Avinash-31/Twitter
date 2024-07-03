import React, { useState, useEffect } from "react";
import { Avatar, Box, Button, Modal, TextField, Tooltip } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import AddVideo from '@mui/icons-material/VideoCall';
import InfoIcon from '@mui/icons-material/Info';
import "./TweetBox.css";
import axios from "axios";
import UseLoggedInUser from "../../../hooks/UseLoggedInUser";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { ThreeDots } from "react-loader-spinner";
import { useTranslation } from "react-i18next";
import VerifiedIcon from '@mui/icons-material/Verified';
import TokenIcon from '@mui/icons-material/Token';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbUpIcon from '@mui/icons-material/ArrowCircleUp';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import CloseIcon from '@mui/icons-material/Close';

const TweetBox = () => {
  // console.log(process.env.REACT_APP_IMBB);
  // console.log(process.env.REACT_APP_CLOUDINARY);
  // console.log(process.env.REACT_APP_CLOUD_NAME);
  const [post, setPost] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVidLoading, setIsVidLoading] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState(" ");
  const [loggedInUser] = UseLoggedInUser();
  const [validVideo, setValidVideo] = useState(false);
  const [user] = useAuthState(auth);
  const email = user?.email;
  const [isMisusing, setMisusing] = useState(false);

  const [postCount, setPostCount] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(0);
  const [subscriptionType, setSubscrtiptonType] = useState(" ");
  const [subscriptionExpiry, setSubscrtiptonExpiry] = useState(Date.now());

  const [likesCount, setLikesCount] = useState(0);
  const [upvotesCount, setUpvotesCount] = useState(0);

  // for otp
  const [otp1, setOtp1] = useState('');
  const [otp2, setOtp2] = useState('');
  const [otp3, setOtp3] = useState('');
  const [otp4, setOtp4] = useState('');


  // For otp verfication
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [payOpenModal, setPayOpenModal] = useState(false);
  const [openPostLimitModal, setOpenPostLimitModal] = useState(false);

  // for language
  const { t } = useTranslation();
  const { subsToPost, subscribe, whatsHappening, subsStatus, subsExpire, subsNot, limitReached, tweet } = t("tweetBox");
  const { chooseText, noCredit, basic, free, free1, free2, free3, free4, pop, yearly, rsy, y1, y2, y3, buy, monthly, mp, limitExceed } = t("paymentModal")
  const { enterotp, l1, verify } = t("otpModal");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://twitter-qgxu.onrender.com/auth/userStatus?email=${email}`);
        const data = await response.json();
        setPostCount(data.postCount);
        setIsSubscribed(data.isSubscribed);
        setLikesCount(data.totalLikes);
        setUpvotesCount(data.totalUpvotes);
        setMisusing(data.isMisusing);
        const date = new Date(data.subscriptionExpiry);
        const formattedDate = date.toLocaleDateString();
        setSubscrtiptonExpiry(formattedDate);
        if (data.isSubscribed === 2) {
          setSubscrtiptonType("Yearly");
        } else if (data.isSubscribed === 1) {
          setSubscrtiptonType("Monthly");
        }
      } catch (error) {
        console.log(error);
      }
    };

    const interval = setInterval(fetchData, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [email]);

  // Function to send OTP
  const sendOtp = async () => {
    try {
      setOtp1('');
      setOtp2('');
      setOtp3('');
      setOtp4('');
      const response = await axios.post('https://twitter-qgxu.onrender.com/auth/otp', { email: user.email });
      if (response.data === 'sent otp') {
        setIsOtpSent(true);
        setOpenModal(true);
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  // Function to verify OTP
  const verifyOtp = async () => {
    try {
      setOtp(otp1 + otp2 + otp3 + otp4);
      const response = await axios.post('https://twitter-qgxu.onrender.com/auth/verify', { email: user.email, otp });
      if (response.data === 'Verified') {
        setIsOtpVerified(true);
        setOpenModal(false);

        // video upload logic
        setIsVidLoading(true);
        const video = document.getElementById("video").files[0];
        const data = new FormData();
        data.append("file", video);
        data.append("upload_preset", "twitter");
        data.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);

        fetch(process.env.REACT_APP_CLOUDINARY, {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            setVideoURL(data.url.toString());
            console.log(data.url.toString());
            setIsVidLoading(false);
          })
          .catch((err) => {

            console.log(err);
            setIsVidLoading(false);
          });
        setIsOtpVerified(false);
      }
      if (response.data === 'Invalid OTP') {
        alert("invalid otp")
      }

    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  // Modal for OTP input

  // style for modal
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const otpModal = (
    <Modal
      open={openModal}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 400 }}>
        <CloseIcon className="closeBtn" onClick={() => setOpenModal(false)} />
        <h2 id="parent-modal-title">{enterotp}</h2>
        <p id="parent-modal-description">
          {l1}{user.email}
        </p>
        <div className="otpField">
          <TextField
            value={otp1}
            onChange={(e) => {
              setOtp1(e.target.value.slice(0, 1));
              if (e.target.value.length === 1) {
                document.getElementById("otp2").focus();
              }
            }}
          />
          <TextField
            id="otp2"
            value={otp2}
            onChange={(e) => {
              setOtp2(e.target.value.slice(0, 1));
              if (e.target.value.length === 1) {
                document.getElementById("otp3").focus();
              }
            }}
          />
          <TextField
            id="otp3"
            value={otp3}
            onChange={(e) => {
              setOtp3(e.target.value.slice(0, 1));
              if (e.target.value.length === 1) {
                document.getElementById("otp4").focus();
              }
            }}
          />
          <TextField
            id="otp4"
            value={otp4}
            onChange={(e) => setOtp4(e.target.value.slice(0, 1))}
          />
          <Button onClick={verifyOtp}>{verify}</Button>
        </div>
      </Box>
    </Modal>
  );

  const paymentModal = (
    <Modal
      open={payOpenModal}
      onClose={() => setPayOpenModal(false)}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: '75%' }}>
        <h1>{chooseText}</h1>
        <p>
          {noCredit}
        </p>

        <div class="pricing">
          <div class="plan">
            <h2>{basic}</h2>
            <div class="price">{free}</div>
            <ul class="features">
              <li><i class="fas fa-check-circle"></i> {free1}</li>
              <li><i class="fas fa-check-circle"></i> {free2}<br></br>{free3}</li>
              <li><i class="fas fa-times-circle"></i> {free4}</li>
            </ul>
          </div>
          <div class="plan popular">
            <span>{pop}</span>
            <h2>{yearly}</h2>
            <div class="price">{rsy}</div>
            <ul class="features">
              <li><i class="fas fa-check-circle"></i> {y1}</li>
              <li><i class="fas fa-check-circle"></i> {y2}</li>
              <li><i class="fas fa-check-circle"></i> {y3}</li>
            </ul>
            <a href="https://buy.stripe.com/test_5kA017gBEdZq1bO288"><button>{buy}</button></a>
          </div>
          <div class="plan">
            <h2>{monthly}</h2>
            <div class="price">{mp}</div>
            <ul class="features">
              <li><i class="fas fa-check-circle"></i> {y1}</li>
              <li><i class="fas fa-check-circle"></i> {y2}</li>
              <li><i class="fas fa-check-circle"></i> {y3}</li>
            </ul>
            <a href="https://buy.stripe.com/test_6oEcNT714aNedYAcMN"><button>{buy}</button></a>
          </div>
        </div>
      </Box>
    </Modal>
  );

  const postLimitModal = (
    <Modal
      open={openPostLimitModal}
      onClose={() => setOpenPostLimitModal(false)}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1>{limitExceed}<br /> {chooseText}</h1>
        <p>
          {noCredit}
        </p>

        <div class="pricing">
          <div class="plan">
            <h2>{basic}</h2>
            <div class="price">{free}</div>
            <ul class="features">
              <li><i class="fas fa-check-circle"></i> {free1}</li>
              <li><i class="fas fa-check-circle"></i> {free2}<br></br>{free3}</li>
              <li><i class="fas fa-times-circle"></i> {free4}</li>
            </ul>
          </div>
          <div class="plan popular">
            <span>{pop}</span>
            <h2>{yearly}</h2>
            <div class="price">{rsy}</div>
            <ul class="features">
              <li><i class="fas fa-check-circle"></i> {y1}</li>
              <li><i class="fas fa-check-circle"></i> {y2}</li>
              <li><i class="fas fa-check-circle"></i> {y3}</li>
            </ul>
            <a href="https://buy.stripe.com/test_5kA017gBEdZq1bO288"><button>{buy}</button></a>
          </div>
          <div class="plan">
            <h2>{monthly}</h2>
            <div class="price">{mp}</div>
            <ul class="features">
              <li><i class="fas fa-check-circle"></i> {y1}</li>
              <li><i class="fas fa-check-circle"></i> {y2}</li>
              <li><i class="fas fa-check-circle"></i> {y3}</li>
            </ul>
            <a href="https://buy.stripe.com/test_6oEcNT714aNedYAcMN"><button>{buy}</button></a>
          </div>
        </div>
      </Box>
    </Modal>
  );

  const userProfilePic = loggedInUser[0]?.profileImage
    ? loggedInUser[0]?.profileImage
    : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png";

  const handleTweet = (e) => {
    e.preventDefault();
    if (isMisusing) {
      alert("You are misusing the platform. Please refrain from spamming.");
      return;
    }
    if (user.providerData[0].providerId === "password") {
      fetch(`https://twitter-qgxu.onrender.com/auth/loggedInUser?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          setUsername(data[0].userName);
          setName(data[0].name);
        });
    } else {
      setUsername(email?.split("@")[0]);
      setName(user.displayName);
    }
    if (name) {
      if (postCount > 10 && !isSubscribed) {
        // alert("You have reached your post limit. Please subscribe to post more");
        setOpenPostLimitModal(true);
        return;
      }
      const userPost = {
        profilePhoto: userProfilePic,
        post: post,
        image: imageURL,
        video: videoURL,
        username: username,
        name: name,
        email: email,
        upvotes: videoURL ? 1 : 0,
        likes: 0,
      };
      // console.log(userPost);
      setPost("");
      setImageURL("");
      setVideoURL("");
      fetch("https://twitter-qgxu.onrender.com/posts/post", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userPost),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          // to reload the page
          // window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleUploadImage = (e) => {
    setIsLoading(true);
    const image = e.target.files[0];
    // console.log(image);

    const formData = new FormData();
    formData.set("image", image);
    axios
      .post(
        process.env.REACT_APP_IMBB,
        formData
      )

      .then((res) => {
        setImageURL(res.data.data.display_url);
        // console.log(res.data.data.display_url);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const handleUploadVideo = (e) => {
    const videoFile = document.getElementById("video").files;
    if (!videoFile.length) {
      return;
    }
    const video = videoFile[0];
    // Check video size (limit to 10MB)
    const fileSize = video.size / (1024 * 1024); // in MB
    if (fileSize > 10) {
      alert("Video size should not exceed 10MB.");
      return;
    }
    else {
      // Check video duration (limit to 2 minutes)
      const videoElement = document.createElement('video');
      videoElement.src = URL.createObjectURL(video);
      videoElement.addEventListener('loadedmetadata', function () {
        if (videoElement.duration > 60) {
          alert("Video length should not exceed 60 seconds.");
          return;
        }
        else {
          if (!isOtpVerified) {
            sendOtp();
          }
        }
      }, false);
      setValidVideo(true);
    }
  }

  const handlePayment = (e) => {
    e.preventDefault();
    // console.log("clicked");
    setPayOpenModal(true);
  }

  return (
    <div className="tweetBox">
      {/* is subscribed subscribe butto is hidden is hidden */}
      {!isSubscribed ? (
        <div className="tweetBox__input" style={{ width: '100%' }}>
          <h4>{subsToPost}</h4>
          <Button onClick={handlePayment}>{subscribe}</Button>
        </div>
      ) : null}
      <form onSubmit={handleTweet}>
        <div className="tweetBox__input">
          <Avatar src={userProfilePic} />
          <input
            type="text"
            placeholder={whatsHappening}
            onChange={(e) => setPost(e.target.value)}
            value={post}
            required
          />
          {/* is user is subscribed show verified icon else InfoIcon */}
          {isSubscribed ?
            <div style={{ display: "flex" }}>
              <Tooltip
                title={`${postCount > 1000 ? `${postCount} posts` : `${postCount} posts`}`}
              >
                {postCount > 1000 ? (
                  <TokenIcon style={{ color: 'black' }} />
                ) : postCount > 50 ? (
                  <TokenIcon style={{ color: 'gray' }} />
                ) : null}
              </Tooltip>

              <Tooltip
                title={`${likesCount > 10000 ? `${likesCount} likes` : `${likesCount} likes`}`}
              >
                {likesCount > 50000 ? (
                  <FavoriteIcon style={{ color: 'red' }} />
                ) : likesCount > 10000 ? (
                  <FavoriteIcon style={{ color: 'magenta' }} />
                ) : null}
              </Tooltip>


              <Tooltip
                title={`${upvotesCount > 50000 ? `${upvotesCount} upvotes` : `${upvotesCount} upvotes`}`}
              >
                {upvotesCount > 50000 ? (
                  <ThumbUpIcon style={{ color: 'blue' }} />
                ) : upvotesCount > 10000 ? (
                  <ThumbUpIcon style={{ color: 'green' }} />
                ) : null
                }
              </Tooltip>

              <Tooltip
                title={`${isMisusing ? 'Misusing! Please refraim from spamming to enable access to posts again' : 'Not Misusing'}`}
              >
                {isMisusing ? (
                  <ThumbDownOffAltIcon style={{ color: 'red' }} />
                ) : null}
              </Tooltip>

              <Tooltip title={`${subsStatus}${isSubscribed ? `${subscriptionType}${subsExpire}${subscriptionExpiry}` : `${subsNot} ${10 - postCount}`}`}>
                <VerifiedIcon style={{ color: '#1DA1F2' }} />
              </Tooltip>
            </div>
            :
            <div>
              <Tooltip
                title={`${postCount > 1000 ? `${postCount} posts` : `${postCount} posts`}`}
              >
                {postCount > 1000 ? (
                  <TokenIcon style={{ color: 'black' }} />
                ) : postCount > 50 ? (
                  <TokenIcon style={{ color: 'gray' }} />
                ) : null}
              </Tooltip>

              <Tooltip
                title={`${likesCount > 10000 ? `${likesCount} likes` : `${likesCount} likes`}`}
              >
                {likesCount > 50000 ? (
                  <FavoriteIcon style={{ color: 'red' }} />
                ) : likesCount > 10000 ? (
                  <FavoriteIcon style={{ color: 'magenta' }} />
                ) : null}
              </Tooltip>


              <Tooltip
                title={`${upvotesCount > 50000 ? `${upvotesCount} upvotes` : `${upvotesCount} upvotes`}`}
              >
                {upvotesCount > 50000 ? (
                  <ThumbUpIcon style={{ color: 'blue' }} />
                ) : upvotesCount > 10000 ? (
                  <ThumbUpIcon style={{ color: 'green' }} />
                ) : null
                }
              </Tooltip>

              <Tooltip
                title={`${isMisusing ? 'Misusing! Please refraim from spamming to enable access to posts again' : 'Not Misusing'}`}
              >
                {isMisusing ? (
                  <ThumbDownOffAltIcon style={{ color: 'red' }} />
                ) : null}
              </Tooltip>

              <Tooltip title={`${subsStatus}${isSubscribed ? `${subscriptionType}${subsExpire}${subscriptionExpiry}` : `${subsNot} ${10 - postCount}`}`}>
                <InfoIcon />
              </Tooltip>

            </div>
          }

          {/* <p>Subscription Status: {isSubscribed ? 'Subscribed' : 'Not Subscribed'}</p> */}
        </div>
        {postCount > 9 && !isSubscribed ? (
          <div style={{ display: 'flex' }}>
            <p style={{ color: 'red' }}>{limitReached}</p>

          </div>
        ) : null}
        <div className="imageIcon_tweetButton">
          <label htmlFor="image" className="imageIcon">
            {isLoading ? (
              <ThreeDots
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              <p>
                {imageURL ? (
                  "image uploaded"
                ) : (
                  <AddPhotoAlternateOutlinedIcon />
                )}
              </p>
            )}
          </label>
          <input
            type="file"
            id="image"
            className="imageInput"
            onChange={handleUploadImage}
          />
        </div>
        <div className="imageIcon_tweetButton">
          <label htmlFor="video" className="imageIcon">
            {isVidLoading ? (
              <ThreeDots
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              <p>{videoURL ? "Video uploaded" : (<AddVideo />)}</p>
            )}
          </label>
          <input
            type="file"
            id="video"
            accept="video/*"
            className="imageInput"
            onChange={handleUploadVideo}
          />
        </div>
        <Button className="tweetBox__tweetButton" type="submit">
          {tweet}
        </Button>
      </form>
      {paymentModal}
      {otpModal}
      {postLimitModal}
    </div>
  );
};

export default TweetBox;
