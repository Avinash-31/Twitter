import React, { useState, useEffect } from "react";
import { Avatar, Box, Button, Modal, TextField } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import AddVideo from '@mui/icons-material/VideoCall';
import "./TweetBox.css";
import axios from "axios";
import UseLoggedInUser from "../../../hooks/UseLoggedInUser";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { ThreeDots } from "react-loader-spinner";

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

  const [postCount, setPostCount] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);

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


  useEffect(() => {
    fetch(`http://localhost:5000/userStatus?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        setPostCount(data.postCount);
        setIsSubscribed(data.isSubscribed);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [email]);

  // Function to send OTP
  const sendOtp = async () => {
    try {
      setOtp1('');
      setOtp2('');
      setOtp3('');
      setOtp4('');
      const response = await axios.post('http://localhost:5000/sendotp', { email: user.email });
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
      const response = await axios.post('http://localhost:5000/verify', { email: user.email, otp });
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
      onClose={() => setOpenModal(false)}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 400 }}>
        <h2 id="parent-modal-title">Enter OTP to proceed</h2>
        <p id="parent-modal-description">
          We have sent otp to your mail {user.email}
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
          <Button onClick={verifyOtp}>Verify OTP</Button>
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
      <Box sx={{ ...style, width: 400 }}>
        <h2 id="parent-modal-title">Choose a plus membership plan</h2>
        <p id="parent-modal-description" style={{ flexDirection: 'column', justifyContent: 'center' }}>
          <h3>Monthly Plan</h3>
          <p>Get access to premium features for a month</p>
          <p>Unlimited posts for a month</p>
          <p>₹ 99</p>
          <button>Monthly</button>
          <h3>Yearly Plan</h3>
          <p>Get access to premium features for a year</p>
          <p>Unlimited posts for a year</p>
          <p>₹ 499</p>
          <button>Yearly</button>
        </p>
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
      <Box sx={{ ...style, width: 'auto', display : 'flex', flexDirection : 'column', justifyContent : 'center', alignItems : 'center' }}>
        <h2 id="parent-modal-title">You have exceeded your Post limit!</h2>
        <p id="parent-modal-description" style={{ flexDirection: 'column', justifyContent: 'center' }}>
          <h3>Monthly Plan</h3>
          <p>Get access to premium features for a month</p>
          <p>Unlimited posts for a month</p>
          <p>₹ 99</p>
          <button>Monthly</button>
          <h3>Yearly Plan</h3>
          <p>Get access to premium features for a year</p>
          <p>Unlimited posts for a year</p>
          <p>₹ 499</p>
          <button>Yearly</button>
        </p>
      </Box>
    </Modal>
  );

  const userProfilePic = loggedInUser[0]?.profileImage
    ? loggedInUser[0]?.profileImage
    : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png";

  const handleTweet = (e) => {
    e.preventDefault();
    if (user.providerData[0].providerId === "password") {
      fetch(`http://localhost:5000/loggedInUser?email=${email}`)
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
      if (postCount > 9) {
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
        upvotes: videoURL ? 1 : 0, // Add this line
      };
      // console.log(userPost);
      setPost("");
      setImageURL("");
      setVideoURL("");
      fetch("http://localhost:5000/posts", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userPost),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
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
    console.log("clicked");
    setPayOpenModal(true);
  }

  return (
    <div className="tweetBox">
      <button onClick={handlePayment} style={{ position: 'relative', right: '-80%' }}>Plus membership</button>
      <form onSubmit={handleTweet}>
        <div className="tweetBox__input">
          <Avatar src={userProfilePic} />
          <input
            type="text"
            placeholder="What's happening?"
            onChange={(e) => setPost(e.target.value)}
            value={post}
            required
          />
        </div>
        <div>
          <p>Post Count: {postCount}</p>
          <p>Subscription Status: {isSubscribed ? 'Subscribed' : 'Not Subscribed'}</p>
        </div>
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
          Tweet
        </Button>
      </form>
      {paymentModal}
      {otpModal}
      {postLimitModal}
    </div>
  );
};

export default TweetBox;
