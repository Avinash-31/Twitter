import React, { useState } from "react";
import TwitterImage from "../../assets/images/twitter.png";
import TwitterIcon from "@mui/icons-material/X";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import GoogleButton from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);

  if (googleUser) {
    // if user not in database then dont register await
    axios
      .get(`http://localhost:5000/loggedInUser?email=${googleUser.user.email}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.length === 0) {
          const user = {
            userName: googleUser.user.displayName,
            name: googleUser.user.displayName,
            email: googleUser.user.email,
          };
          // console.log(googleUser.user.displayName);
          const { data } = axios.post("http://localhost:5000/register", user);
          console.log(data);
          navigate("/home/profile");
        }
        else{
          navigate("/home/profile");
        }
      });
  }
  else {
    if (user) {
      navigate("/home/profile");
    }
  }
  if (error) {
    alert(error.message);
    console.log(error.message);
    console.log(errorMessage);
  }
  if (loading) {
    console.log("loading...");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    signInWithEmailAndPassword(email, password);
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle();
  };
  return (
    <div className="login-container">
      <div className="image-conatiner">
        <img className="image" src={TwitterImage} alt="twitter" />
      </div>
      <div className="form-container">
        <div className="form-box">
          <TwitterIcon className="Twittericon" style={{ color: "white" }} />
          <h2 className="heading">Happening Now</h2>
          <h3 className="heaiding1">Join today.</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="email"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="btn-login">
              <button type="submit" className="btn">
                Login
              </button>
            </div>
            <hr />
            <div className="google-button">
              <GoogleButton
                className="g-btn"
                type="light"
                onClick={handleGoogleSignIn}
              />
            </div>
            <div>
              Don't have an account?
              <Link
                to="/signup"
                style={{
                  textDecoration: "none",
                  color: "skyblue",
                  fontWeight: "600",
                  marginLeft: "5px",
                }}
              >
                Signup
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
