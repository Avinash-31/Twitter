import React, { useState } from "react";
import "./EditProfile.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  width: 600,
  height: 600,
  bgColor: "background.paper",
  boxShadow: 24,
  borderRadius: 8,
};

function EditChild({ dob, setDob }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="birthdate-section" onClick={handleOpen}>
        <text>Edit</text>
      </div>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 300, height: 400 }}>
          <div className="text">
            <h2>Edit date of birth?</h2>
            <p>
              This can only be changed a few times.
              <br />
              make sure you enter the age of the <br />
              person using account
            </p>
            <input type="date" onChange={(e) => setDob(e.target.value)} />
            <button
              className="e-button"
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default function EditProfile({ user, loggedInUser }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [dob, setDob] = useState("");

  const HandleSave = async () => {
    const editedInfo = {
      name,
      bio,
      location,
      website,
      dob,
    };
    fetch(`https://twitter-qgxu.onrender.com/userUpdates/${user?.email}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(editedInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("done", data);
      });
  };

  return (
    <div>
      <button className="Edit-profile-btn" onClick={() => setOpen(true)}>
        Edit Profile
      </button>

      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modal">
          <div className="header">
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
            <h2 className="header-title">Edit Profile</h2>
            <button className="save-btn" onClick={HandleSave}>
              Save
            </button>
          </div>
          <form className="fill-content">
            <div style={{ display: "flex" }}>
              <h5>Name : </h5>
              <TextField
                className="text-field"
                fullWidth
                is="fullWidth"
                onChange={(e) => setName(e.target.value)}
                defaultValue={loggedInUser[0]?.name ? loggedInUser[0]?.name : ""}
              />
            </div>


            <div style={{ display: "flex" }}>
              <h5>Bio : </h5>
              <TextField
                className="text-field"
                fullWidth
                is="fullWidth"
                onChange={(e) => setBio(e.target.value)}
                defaultValue={loggedInUser[0]?.bio ? loggedInUser[0]?.bio : ""}
              />
            </div>
            <div style={{ display: "flex" }}>
              <h5>Location : </h5>
              <TextField
                className="text-field"
                fullWidth
                is="fullWidth"
                onChange={(e) => setLocation(e.target.value)}
                defaultValue={
                  loggedInUser[0]?.location ? loggedInUser[0]?.location : ""
                }
              />
            </div>
            <div style={{ display: "flex" }}>
              <h5>Website : </h5>
              <TextField
                className="text-field"
                fullWidth
                is="fullWidth"
                onChange={(e) => setWebsite(e.target.value)}
                defaultValue={
                  loggedInUser[0]?.website ? loggedInUser[0]?.website : ""
                }
              />
            </div>
          </form>
          <div className="birthdate-section">
            <p>Birth Date</p>
            <p>.</p>
            <EditChild dob={dob} setDob={setDob} />
          </div>
          <div className="last-section">
            {loggedInUser[0]?.dob ? (
              <h2>{loggedInUser[0]?.dob}</h2>
            ) : (
              <h2>{dob ? dob : "Add your date of birth"}</h2>
            )}
            <div className="last-btn">
              <h2>Switch to Professional</h2>
              <ChevronRightIcon />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}