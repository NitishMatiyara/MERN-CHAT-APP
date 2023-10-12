import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ContextProvider } from "../Context/SocketProvider";

import VideoPlayer from "../components/VideoChat/Videoplayer.js";
import MediaControls from "../components/VideoChat/MediaControls.js";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    backgroundColor: "black",
  },
}));

const VideoPage = () => {
  const classes = useStyles();

  return (
    <>
      <ContextProvider>
        <div className={classes.wrapper}>
          <Typography
            variant="h4"
            align="center"
            style={{ color: "white", margin: "1rem" }}
          >
            Video Chat
          </Typography>

          <VideoPlayer />
          <MediaControls />
        </div>
      </ContextProvider>
    </>
  );
};

export default VideoPage;
