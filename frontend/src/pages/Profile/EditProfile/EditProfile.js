import React, { useState } from "react";
import "./EditProfile.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import axios from "axios";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const { edit, editDOB, line1, line2, line3, cancel} = t("editProfile");

  return (
    <>
      <div className="birthdate-section" onClick={handleOpen}>
        <text>{edit}</text>
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
            <h2>{editDOB}</h2>
            <p>
              {line1}
              <br />
              {line2}<br />
              {line3}
            </p>
            <input type="date" onChange={(e) => setDob(e.target.value)} />
            <button
              className="e-button"
              onClick={() => {
                setOpen(false);
              }}
            >
              {cancel}
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

  const { t } = useTranslation();
  const {editProfile, save, pname, pbio, plocation, pwebsite, birthDate, addDob, switchTo } = t("editPorfileModal");
  
  const HandleSave = async () => {
    const editedInfo = {
      name,
      bio,
      location,
      website,
      dob,
    };
    fetch(`https://twitter-qgxu.onrender.com/user/userUpdates/${user?.email}`, {
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
        {editProfile}
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
            <h2 className="header-title">{editProfile}</h2>
            <button className="save-btn" onClick={HandleSave}>
              {save}
            </button>
          </div>
          <form className="fill-content">
            <div style={{ display: "flex" }}>
              <h5>{pname}</h5>
              <TextField
                className="text-field"
                fullWidth
                is="fullWidth"
                onChange={(e) => setName(e.target.value)}
                defaultValue={loggedInUser[0]?.name ? loggedInUser[0]?.name : ""}
              />
            </div>


            <div style={{ display: "flex" }}>
              <h5>{pbio}</h5>
              <TextField
                className="text-field"
                fullWidth
                is="fullWidth"
                onChange={(e) => setBio(e.target.value)}
                defaultValue={loggedInUser[0]?.bio ? loggedInUser[0]?.bio : ""}
              />
            </div>
            <div style={{ display: "flex" }}>
              <h5>{plocation}</h5>
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
              <h5>{pwebsite}</h5>
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
            <p>{birthDate}</p>
            <p>.</p>
            <EditChild dob={dob} setDob={setDob} />
          </div>
          <div className="last-section">
            {loggedInUser[0]?.dob ? (
              <h2>{loggedInUser[0]?.dob}</h2>
            ) : (
              <h2>{dob ? dob : addDob}</h2>
            )}
            <div className="last-btn">
              <h2>{switchTo}</h2>
              <ChevronRightIcon />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
