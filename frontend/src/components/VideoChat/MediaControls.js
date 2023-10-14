import React, { useState, useContext } from "react";
import { Typography, IconButton } from "@material-ui/core";
import {
  PhoneEnabled,
  PhoneDisabled,
  PhoneInTalk,
  Videocam,
  VideocamOff,
  Mic,
  MicOff,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import { SocketContext } from "../../Context/SocketProvider";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "10px 20px",
    border: "2px solid black",
  },
  circleIcon: {
    background: "#D22B2B",
    padding: "7px",
    borderRadius: "50%",
    margin: "1rem 3rem 1rem",
    "&:hover": {
      backgroundColor: "#D22B2B",
      color: "white",
    },
  },
  controls: { color: "white", fontSize: "x-large" },
  footer: {
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    bottom: "1rem",
    alignItems: "center",
  },
  controlsBar: { display: "flex" },
}));

const Sidebar = ({ children }) => {
  const {
    callAccepted,
    participant,
    callEnded,
    leaveCall,
    callUser,
    stream,
    room,
    call,
  } = useContext(SocketContext);
  const [calling, setCalling] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);
  const [videoMuted, setVideoMuted] = useState(false);

  const classes = useStyles();

  function toggleMuteAudio() {
    if (stream) {
      setAudioMuted(!audioMuted);
      stream.getAudioTracks()[0].enabled = audioMuted;
    }
  }

  function toggleMuteVideo() {
    if (stream) {
      setVideoMuted(!videoMuted);
      stream.getVideoTracks()[0].enabled = videoMuted;
    }
  }
  const toggleCall = () => {
    setCalling(true);
    callUser(room);
  };
  return (
    <>
      <div className={classes.footer}>
        {calling && !call.isReceivingCall && (
          <Typography
            variant="h5"
            style={{ color: "white", fontFamily: "Work sans" }}
          >
            Calling {participant}...
          </Typography>
        )}

        <div className={classes.controlsBar}>
          <IconButton
            className={classes.circleIcon}
            onClick={() => toggleMuteVideo()}
          >
            {videoMuted ? (
              <VideocamOff className={classes.controls} />
            ) : (
              <Videocam className={classes.controls} />
            )}
          </IconButton>
          <IconButton
            className={classes.circleIcon}
            onClick={() => toggleMuteAudio()}
          >
            {audioMuted ? (
              <MicOff className={classes.controls} />
            ) : (
              <Mic className={classes.controls} />
            )}
          </IconButton>
          {callAccepted && !callEnded ? (
            <IconButton className={classes.circleIcon} onClick={leaveCall}>
              <PhoneDisabled className={classes.controls} />
            </IconButton>
          ) : (
            <IconButton
              className={classes.circleIcon}
              onClick={() => toggleCall()}
            >
              <PhoneInTalk className={classes.controls} />
            </IconButton>
          )}
        </div>
        {children}
      </div>
    </>
  );
};

export default Sidebar;
