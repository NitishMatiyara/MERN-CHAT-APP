import React, { useContext } from "react";
import { Grid, Typography, Paper, makeStyles } from "@material-ui/core";

import { SocketContext } from "../../Context/SocketProvider";
import Notifications from "./Notifications";

const useStyles = makeStyles((theme) => ({
  video: {
    borderRadius: "3%",
    maxWidth: "600px",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "260px",
    },
  },
  gridContainer: {
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },

  paper: {
    width: "41%",
    [theme.breakpoints.down("sm")]: {
      width: "75%",
      margin: "auto",
    },
    padding: "5px",
    border: "2px solid gray",
    borderRadius: "3%",
    margin: "10px",
    backgroundColor: "#B2BEB5",
  },
}));

const VideoPlayer = () => {
  const {
    participant,
    name,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
    call,
  } = useContext(SocketContext);
  const classes = useStyles();

  return (
    <>
      {call.name !== name ? <Notifications /> : ""}
      <Grid container className={classes.gridContainer}>
        {stream && (
          <Paper className={classes.paper}>
            <Grid item xs={8} md={7} lg={6}>
              <Typography variant="h6" gutterBottom>
                {name || "Name"}
              </Typography>
              <video
                playsInline
                muted
                ref={myVideo}
                autoPlay
                className={classes.video}
              />
            </Grid>
          </Paper>
        )}
        {callAccepted && !callEnded && (
          <Paper className={classes.paper}>
            <Grid item xs={8} md={7} lg={6}>
              <Typography variant="h5" gutterBottom>
                {participant || "Name"}
              </Typography>
              <video
                playsInline
                muted
                ref={userVideo}
                autoPlay
                className={classes.video}
              />
            </Grid>
          </Paper>
        )}
      </Grid>
    </>
  );
};

export default VideoPlayer;
