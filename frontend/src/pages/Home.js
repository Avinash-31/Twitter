import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Feed from "./Feed/Feed";
import { Outlet } from "react-router-dom";
import Widgets from "./Widgets/Widgets";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { signOut } from "firebase/auth";
import UseLoggedInUser from "../hooks/UseLoggedInUser";
import axios from "axios";
import { Box, Button, Modal, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

const Home = () => {
  const [user] = useAuthState(auth);
  const [loggedInUser] = UseLoggedInUser();
  const { t } = useTranslation();

  const [browserType, setBrowserType] = useState("");
  const [osType, setOsType] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [ipValue, setIpValue] = useState("");
  var isUserInfoVerfied = true;
  const [check, setCheck] = useState(false);


  const { l1, verify, enterOtp } = t("otpModal");
  // console.log(loggedInUser);
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

  useEffect(() => {
    const interval = setInterval(() => {
      // fetch from router /time
      axios.get("https://twitter-qgxu.onrender.com/auth/time").then((res) => {
        if (res.data === "Access granted") {
          // do something
        } else {
          // logout the user and redirect
          signOut(auth).then(() => {
            window.location.href = "/login";
          });
        }
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

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
        isUserInfoVerfied = true;
        setOpenModal(false);
      }
      if (otp && response.data === "Invalid OTP") {
        alert("Invalid otp")
      }
      if (response.data === "OTP expired") {
        alert("OTP Expired!")
      }
      if (response.data === "Email not found") {
        alert("Email not found")
      }

    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  // Modal for OTP input

  // style for modal
  const style = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    pt: 2,
    px: 4,
    pb: 3,
  };

  const otpModal = (
    <Modal
      disableBackdropClick
      open={openModal}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style }}>
        {/* <CloseIcon className="closeBtn" onClick={() => setOpenModal(false)} /> */}
        <h2 id="parent-modal-title">{enterOtp}</h2>
        <h6>Browser :{browserType}; OS : {osType}; Device : {deviceType}; IP : {ipValue}</h6>
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

  const email = user?.email;


  const fetchData = async () => {
    try {
      if (!check) {
        const response = await fetch(`https://twitter-qgxu.onrender.com/auth/userInfo?email=${email}`);
        const data = await response.json();
        setBrowserType(data.userInfo.browser);
        setOsType(data.userInfo.os);
        setDeviceType(data.userInfo.device);
        setIpValue(data.userInfo.ip);
        isUserInfoVerfied = data.isBrowserVerified;
        setCheck(true);
        console.log("Is broser Verified", data.isBrowserVerified);
        // console.log(isUserInfoVerfied);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // fetch data function should run upon opening this page for only once
  useEffect(() => {
    //after waiting for 2 seconds the fetchData should work
    setTimeout(() => {
      fetchData();
    });
    setTimeout(() => {
      // console.log(isUserInfoVerfied);
      if (!isOtpVerified && !isUserInfoVerfied) {
        // alert("Otp needs to be verified");
        sendOtp();
      }
    }, 2000);
  }, []);



  const handleLogout = () => {
    signOut(auth);
  };
  return (
    <div className="app">
      <Sidebar handleLogout={handleLogout} user={loggedInUser} />
      <Outlet />
      <Widgets />
      {otpModal}
    </div>
  );
};

export default Home;
