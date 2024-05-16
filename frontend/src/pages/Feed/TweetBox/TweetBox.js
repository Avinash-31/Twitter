import React, { useState } from "react";
import { Avatar, Button, Modal, TextField } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import AddVideo from '@mui/icons-material/VideoCall';
import "./TweetBox.css";
import axios from "axios";
import UseLoggedInUser from "../../../hooks/UseLoggedInUser";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { ThreeDots } from "react-loader-spinner"

const TweetBox = () => {
  const [post, setPost] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVidLoading, setIsVidLoading] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState(" ");
  const [loggedInUser] = UseLoggedInUser();
  const [user] = useAuthState(auth);
  const email = user?.email;

  // For otp verfication
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // Function to send OTP
  const sendOtp = async () => {
    try {
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
      const response = await axios.post('http://localhost:5000/verify', { email: user.email, otp });
      if (response.data === 'Verified') {
        setIsOtpVerified(true);
        setOpenModal(false);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  // Modal for OTP input
  const otpModal = (
    <Modal open={openModal} onClose={() => setOpenModal(false)}>
      <div>
        <TextField label="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
        <Button onClick={verifyOtp}>Verify OTP</Button>
      </div>
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
      const userPost = {
        profilePhoto: userProfilePic,
        post: post,
        image: imageURL,
        video: videoURL,
        username: username,
        name: name,
        email: email,
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
        "https://api.imgbb.com/1/upload?key=37fe4cb64c9314cb7d69dc88a1d6ff3f",
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
    setIsVidLoading(true);
    const video = e.target.files[0];
    const data = new FormData();
    data.append("file", video);
    data.append("upload_preset", "twitter");
    data.append("cloud_name", "daeq5e65i");

    fetch("https://api.cloudinary.com/v1_1/daeq5e65i/video/upload", {
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
  }

  return (
    <div className="tweetBox">
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
      {isOtpSent ? otpModal : <Button onClick={sendOtp}>Send OTP</Button>}
    </div>
  );
};

export default TweetBox;
